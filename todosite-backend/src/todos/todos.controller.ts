import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import type { TodoType } from './types/todo.types'
import type { CreateTodoDto } from './dto/create-todo.dto';
import type { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    getTodos(): TodoType[] {
        return this.todosService.findAll();
    }

    @Post()
    createTodo(@Body() dto: CreateTodoDto): TodoType {
        return this.todosService.create(dto);
    }

    @Patch(':id')
    updateTodo(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTodoDto
    ): TodoType {
        return this.todosService.update(id, dto)
    }

    @Delete(':id')
    deleteTodo(@Param('id', ParseIntPipe) id: number): void {
        this.todosService.delete(id);
    }
}
