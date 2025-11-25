import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosService } from './todos/todos.service';
import { TodosController } from './todos/todos.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  exports: [PrismaService],
  controllers: [AppController, TodosController],
  providers: [AppService, TodosService, PrismaService],
})
export class AppModule {}
