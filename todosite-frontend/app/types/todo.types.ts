export type TodoType = {
    id: number;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
}