'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchTodoById } from '@/app/lib/fetchTodoById';
import { updateTodo } from '@/app/lib/updateTodo';
import type { TodoType } from '@types/todo.types';

export default function UpdateTodoPage() {
    const router = useRouter();
    const params = useParams();
    const id = Number(params.id);

    const [todo, setTodo] = useState<TodoType | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTodoById(id).then(setTodo).catch(err => setError(err.message));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!todo) return;

        try {
            await updateTodo(id, {
                description: todo.description,
                priority: todo.priority,
                completed: todo.completed,
            });
            router.push('/todos');
        } catch(err) {
            setError((err as Error).message);
        }
    };

    if (!todo) return <p>Loading...</p>

    return (
        <main>
            <h1>Update Todo</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={todo.description}
                    onChange={e => setTodo({ ...todo, description: e.target.value })}
                    required 
                />

                <select
                    value={todo.priority}
                    onChange={e => setTodo({ ...todo, priority: e.target.value as any})}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <label>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={e => setTodo({ ...todo, completed: e.target.checked})}
                    />
                    Completed
                </label>

                <button type="submit">Update</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </main>
    );
}