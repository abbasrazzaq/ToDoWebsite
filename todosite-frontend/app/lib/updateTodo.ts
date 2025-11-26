import { apiFetch } from './apiFetch';
import type { TodoType } from '../types/todo.types';

type UpdateTodoInput = Partial<Omit<TodoType, 'id'>>;

export async function updateTodo(id: number, data: UpdateTodoInput): Promise<TodoType> {
  return apiFetch<TodoType>(`/todos/${id}`, { 
    method: 'PATCH',  
    body: JSON.stringify(data)
  });
}