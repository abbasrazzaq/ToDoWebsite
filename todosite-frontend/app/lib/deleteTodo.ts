import { API_BASE_URL } from './config';
import { apiFetch } from './apiFetch';

export async function deleteTodo(id: number): Promise<void> {
    await apiFetch<void>(`/todos/${id}`, {
        method: 'DELETE',
    });
}