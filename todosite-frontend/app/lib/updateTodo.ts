import { API_BASE_URL } from './config';
import type { TodoType } from '@types/todo.types';

type UpdateTodoInput = Partial<Omit<TodoType, 'id'>>;

export async function updateTodo(id: number, data: UpdateTodoInput): Promise<TodoType> {
  const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update todo');
  }

  return res.json();
}