import { apiFetch } from './apiFetch';
import type { TodoType } from '../types/todo.types';

export async function fetchTodoById(id: number): Promise<TodoType> {
    return await apiFetch<TodoType>(`/todos/${id}`, {
        method: 'GET',
    });
}