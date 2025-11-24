'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchTodoById } from '@/app/lib/fetchTodoById';
import { updateTodo } from '@/app/lib/updateTodo';
import type { TodoType } from '@/app/types/todo.types';
import styles from '../../TodoStyles.module.css';

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
        <main className={styles.container}>
            <h1 className={styles.heading}>
                Update the Todo
            </h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={todo.description}
                    onChange={e => setTodo({ ...todo, description: e.target.value })}
                    required 
                    className={styles.input}
                />

                <select
                    value={todo.priority}
                    onChange={e => setTodo({ ...todo, priority: e.target.value as any})}
                    className={styles.select}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={e => setTodo({ ...todo, completed: e.target.checked})}
                    />
                    Completed
                </label>

                <button 
                    type="submit"
                    className={styles.button}
                >
                    Update
                </button>
                {/* TODO: Cancel button: include are you sure? */}
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </main>
    );
}