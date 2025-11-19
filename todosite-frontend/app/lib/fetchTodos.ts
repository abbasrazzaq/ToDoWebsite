export async function fetchTodos() {
    // TODO: Remove hardcoded url
    const res = await fetch('http://localhost:3000/todos', {
        next: { revalidate: 0 }
    });

    if(!res.ok) {
        throw new Error('Failed to fetch todos');
    }

    return res.json();
}