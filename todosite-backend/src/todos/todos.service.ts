import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoType } from './types/todo.types';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    private todos: TodoType[] = [
        { id: 1, description: "Buy groceries", completed: false, priority: 'medium' },
        { id: 2, description: "Wash the car", completed: true, priority: 'low'},
        { id: 3, description: "Clean the toilet", completed: false, priority: 'high'}
    ];
    private idCounter = 4;

    findAll(): TodoType[] {
        return this.todos;
    }

    create(createTodoDto : CreateTodoDto): TodoType {
        const newTodo: TodoType = {
            id: this.idCounter++,
            ...createTodoDto
        };
        this.todos.push(newTodo);
        return newTodo;
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
