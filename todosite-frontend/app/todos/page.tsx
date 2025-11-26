'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TodoType } from "../types/todo.types";
import { fetchTodos } from "../lib/fetchTodos";
import { deleteTodo } from "../lib/deleteTodo";
import styles from './TodosPage.module.css';

export default function ToDosPage() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        fetchTodos().then(
            v => setTodos(v)
        ).catch(
            console.error
        );
    }, []);

    const handleUpdate = async (id: number) => {
        router.push(`/todos/update/${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } catch(err) {
            console.error('Delete failed: ', err);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.container}>
                ToDos!
            </h1>

            <ul className={styles.todoList}>
                {todos.map(todo => (
                    <li key={todo.id} className={styles.todoItem}>

                        <span>
                            <strong>{todo.description}</strong>
                            <div className={`${styles.status} ${!todo.completed ? styles.pending : ''}`}>
                                {todo.completed ? 'Completed' : 'Pending'}
                            </div>
                                Priority: <em>{todo.priority}</em>
                        </span>

                        <div>
                            <button className={`${styles.button} ${styles.update}`}
                                onClick={() => handleUpdate(todo.id)}
                            >
                                Update
                            </button>
                            <button className={`${styles.button} ${styles.delete}`}
                                onClick={() => handleDelete(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        
    );
}