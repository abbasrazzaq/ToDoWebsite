import { IsString, IsBoolean, IsIn } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    description: string;

    @IsBoolean()
    completed: boolean;

    @IsIn(['low', 'medium', 'high'])
    priority: 'low' | 'medium' | 'high';
}