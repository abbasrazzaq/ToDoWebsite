'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTodo } from '@/app/lib/createTodo';
import styles from '../TodoStyles.module.css'

export default function CreateTodoPage() {
    const router = useRouter();

    // Get priorities from server (id & name)
    // Populate dropdown from the values.
    // Pass up id only on create

    
    const [description, setDescription] = useState('');
    //const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [priorityId, setPriorityId] = useState<number>(1);
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createTodo({ description, priorityId, completed });
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
                    value={priorityId} 
                    onChange={e => setPriorityId(Number(e.target.value))}
                    className={styles.select}
                >
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
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