import { Injectable } from '@nestjs/common';
import { TodoType } from 'src/types/todo.types';

@Injectable()
export class TodosService {
    private todos: TodoType[] = [
        { id: 1, description: "Buy groceries", completed: false, priority: 'medium' },
        { id: 2, description: "Wash the car", completed: true, priority: 'low'},
        { id: 3, description: "Clean the toilet", completed: false, priority: 'high'}
    ];

    findAll(): TodoType[] {
        return this.todos;
    }
}
