import { API_BASE_URL } from './config';
import { apiFetch } from './apiFetch';
import type { TodoType } from '../types/todo.types';

type CreateTodoDtoInput = Omit<TodoType, 'id'>;

export async function createTodo(data: CreateTodoDtoInput): Promise<TodoType> {
    return await apiFetch<TodoType>('/todos', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}