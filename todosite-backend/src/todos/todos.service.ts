import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoType } from './types/todo.types';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';
import { Todo } from '../../generated/prisma/client';

@Injectable()
export class TodosService {
    constructor(private prismaService: PrismaService) {}
    
    private todos: TodoType[] = [
        { id: 1, description: "Buy groceries", completed: false, priority: 'medium' },
        { id: 2, description: "Wash the car", completed: true, priority: 'low'},
        { id: 3, description: "Clean the toilet", completed: false, priority: 'high'}
    ];
    private idCounter = 4;

    private mapPrismaTodo(todo: Todo): TodoType {
        return {
            id: todo.id,
            description: todo.description,
            completed: todo.completed,
            // cast in case Prisma's type is a string/enum variant / align with TodoType
            priority: todo.priority as TodoType['priority'],
        };
    }

    async findAll(): Promise<TodoType[]> {
        //return this.todos;
        const prismaTodos = await this.prismaService.todo.findMany();
        return prismaTodos.map(t => this.mapPrismaTodo(t));
    }

    findOne(id: number): TodoType {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) throw new NotFoundException('Todo not found');

        return todo;
    }

    // create(createTodoDto : CreateTodoDto): TodoType {
    //     const newTodo: TodoType = {
    //         id: this.idCounter++,
    //         ...createTodoDto
    //     };
    //     this.todos.push(newTodo);
    //     return newTodo;
    // }

    async create(createTodoDto: CreateTodoDto): Promise<TodoType> {
        const createdTodo = await this.prismaService.todo.create({
            data: {
                description: createTodoDto.description,
                completed: createTodoDto.completed,
                priority: createTodoDto.priority,
            }
        });
        return this.mapPrismaTodo(createdTodo);
    }

    update(id: number, updateDto: UpdateTodoDto): TodoType {
        const todo = this.todos.find(t => t.id === id);
        if(!todo) throw new NotFoundException('Todo not found');

        Object.assign(todo, updateDto);
        return todo;
    }

    delete(id: number): void {
        const index = this.todos.findIndex(t => t.id === id);
        if(index === -1) {
            throw new NotFoundException('Todo not found');
        }
        this.todos.splice(index, 1);
    }
}
