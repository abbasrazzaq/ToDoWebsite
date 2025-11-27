import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    description: string;

    @IsBoolean()
    completed: boolean;

    @IsNumber()
    priorityId: number;
}