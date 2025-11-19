export type TodoType = {
    id: number;
    description: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
}