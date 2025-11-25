import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import type { TodoType } from './types/todo.types'
import type { CreateTodoDto } from './dto/create-todo.dto';
import type { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    async getTodos(): Promise<TodoType[]> {
        return this.todosService.findAll();
    }

    @Get(':id')
    async getTodoById(@Param('id', ParseIntPipe) id: number): Promise<TodoType> {
        return this.todosService.findOne(id);
    }

    @Post()
    async createTodo(@Body() dto: CreateTodoDto): Promise<TodoType> {
        return this.todosService.create(dto);
    }

    @Patch(':id')
    async updateTodo(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTodoDto
    ): Promise<TodoType> {
         return this.todosService.update(id, dto)
    }

    @Delete(':id')
    async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.todosService.delete(id);
    }
}
