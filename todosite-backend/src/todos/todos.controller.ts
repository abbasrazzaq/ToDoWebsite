import { Controller, Get } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoType } from '../types/todo.types'

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    getTodos(): TodoType[] {
        return this.todosService.findAll();
    }
}
