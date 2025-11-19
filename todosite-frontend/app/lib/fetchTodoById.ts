import { API_BASE_URL } from './config';
import type { TodoType } from '@types/todo.types';

export async function fetchTodoById(id: number): Promise<TodoType> {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
        next: { revalidate: 0 },
    });

    if (!res.ok) {
        throw new Error('Todo not found');
    }

    return res.json();
}