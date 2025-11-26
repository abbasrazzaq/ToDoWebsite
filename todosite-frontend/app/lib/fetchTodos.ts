import { apiFetch } from './apiFetch';
import type { TodoType } from '../types/todo.types'

export async function fetchTodos(): Promise<TodoType[]> {
    return await apiFetch<TodoType[]>('/todos', {
        method: 'GET',
    });
}