import { API_BASE_URL } from './config';
import type { TodoType } from '../types/todo.types';

type CreateTodoDtoInput = Omit<TodoType, 'id'>;

export async function createTodo(data: CreateTodoDtoInput): Promise<TodoType> {
    const res = await fetch(`${API_BASE_URL}/todos`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(data), 
    });

    if(!res.ok) {
        throw new Error('Failed to create todo');
    }

    return res.json();
}