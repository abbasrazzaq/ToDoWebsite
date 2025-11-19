import { API_BASE_URL } from './config';

export async function deleteTodo(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete todo');
    }
}