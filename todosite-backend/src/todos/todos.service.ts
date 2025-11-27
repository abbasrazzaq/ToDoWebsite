import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoType } from './types/todo.types';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';
import { Todo, Priority } from '../../generated/prisma/client';

@Injectable()
export class TodosService {
    constructor(private prismaService: PrismaService) {}

    private mapPrismaTodo(todo: Todo & { priority?: Priority | null }): TodoType {
        return {
            id: todo.id,
            description: todo.description,
            completed: todo.completed,
            // cast in case Prisma's type is a string/enum variant / align with TodoType
            priority: todo.priority?.name as TodoType['priority'],
        };
    }

    async findAll(): Promise<TodoType[]> {
        const prismaTodos = await this.prismaService.todo.findMany({
            include: { priority: true }
        });
        return prismaTodos.map(t => this.mapPrismaTodo(t));
    }

    async findOne(id: number): Promise<TodoType> {
        const prismaTodo = await this.prismaService.todo.findUnique({
            where: { id },
            include: { priority: true },
        });

        if(!prismaTodo) throw new NotFoundException('Todo not found');

        return this.mapPrismaTodo(prismaTodo!);
    }

    async create(createTodoDto: CreateTodoDto): Promise<TodoType> {
        // Look up priorityId by name
        const priority = await this.prismaService.priority.findUnique({
            where: { name: createTodoDto.priority },
        });
        if (!priority) throw new NotFoundException('Priority not found');

        const createdTodo = await this.prismaService.todo.create({
            data: {
                description: createTodoDto.description,
                completed: createTodoDto.completed,
                priorityId: priority.id,
            },
            include: { priority: true },
        });
        return this.mapPrismaTodo(createdTodo);
    }

    async update(id: number, updateDto: Partial<UpdateTodoDto>): Promise<TodoType> {
        let priorityId: number | undefined;
        if (updateDto.priority) {
            const priority = await this.prismaService.priority.findUnique({
                where: { name: updateDto.priority}
            });
            if (!priority) throw new NotFoundException('Priority not found');
            priorityId = priority.id;
        }

        const updatedTodo = await this.prismaService.todo.update({
            where: { id },
            data: {
                description: updateDto.description,
                completed: updateDto.completed,
                ... (priorityId && { priorityId }),
            },
            include: { priority: true },
        });

        return this.mapPrismaTodo(updatedTodo);
    }

    async delete(id: number): Promise<Todo> {
        return this.prismaService.todo.delete({
            where: { id }
        });
    }
}
