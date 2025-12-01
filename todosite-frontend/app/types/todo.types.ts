export type TodoType = {
    id: number;
    description: string;
    completed: boolean;
    priorityId: number;
    priority?: 'low' | 'medium' | 'high';
}