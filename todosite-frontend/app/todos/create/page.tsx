'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTodo } from '@/app/lib/createTodo';
import styles from '../TodoStyles.module.css'

export default function CreateTodoPage() {
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createTodo({ description, priority, completed });
            router.push('/todos');

        } catch(err) {
            setError((err as Error).message);
        }
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.heading}>
                Create a Todo
            </h1>
            <form 
                onSubmit={handleSubmit}
                className={styles.form}
            >
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    className={styles.input}
                />

                <select 
                    value={priority} 
                    onChange={e => setPriority(e.target.value as any)}
                    className={styles.select}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={e => setCompleted(e.target.checked)}
                        />
                        Completed
                </label>

                <button 
                    type="submit"
                    className={styles.button}
                >
                    Create
                </button>
                {/* TODO: validation */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </main>
    );
}