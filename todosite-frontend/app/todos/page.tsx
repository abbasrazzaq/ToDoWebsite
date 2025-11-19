'use client'

import { useEffect, useState } from 'react';
import { TodoType } from "../types/todo.types";
import { fetchTodos } from "../lib/fetchTodos";
import { deleteTodo } from "../lib/deleteTodo";

export default function ToDosPage() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    
    useEffect(() => {
        fetchTodos().then(setTodos).catch(console.error);
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } catch(err) {
            console.error('Delete failed: ', err);
        }
    };

    return (
        <div>
            <p>ToDos Page</p>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span>
                            {todo.description} - {todo.completed ? 'Completed' : 'Pending'} - Priority: {todo.priority}
                        </span>
                        <button
                            onClick={() => handleDelete(todo.id)}
                            style={{ marginLeft: '1rem', color: 'red' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        
    );
}