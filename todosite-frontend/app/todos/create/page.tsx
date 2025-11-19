'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTodo } from '@/app/lib/createTodo';

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
        <main>
            <h1>Create Todo</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />

                <select value={priority} onChange={e => setPriority(e.target.value as any)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <label>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={e => setCompleted(e.target.checked)}
                        />
                        Completed
                </label>

                <button type="submit">Create</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}

            </form>
        </main>
    );
}