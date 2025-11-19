import { API_BASE_URL } from "./config";

export async function fetchTodos() {
    const res = await fetch(`${API_BASE_URL}/todos`, {
        next: { revalidate: 0 }
    });

    if(!res.ok) {
        throw new Error('Failed to fetch todos');
    }

    return res.json();
}