import { TodoType } from "../types/todo.types";
import { fetchTodos } from "../lib/fetchTodos";

// const todos: TodoType[] = [
//     { id: 1, description: "Buy groceries", completed: false, priority: 'medium' },
//     { id: 2, description: "Wash the car", completed: true, priority: 'low'},
// ];

export default async function ToDosPage() {
    const todos: TodoType[] = await fetchTodos();
    return (
        <div>
            <p>ToDos Page</p>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.description} - {todo.completed ? 'Completed' : 'Pending'} - Priority: {todo.priority}
                    </li>
                ))}
            </ul>
        </div>
        
    );
}