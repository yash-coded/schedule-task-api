import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  CreateTaskDto,
  GetAllTasksDto,
  UpdateTaskDto,
} from '../../entities/dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(@Body() input: CreateTaskDto) {
    return this.taskService.createTask(input);
  }

  @Get(':id')
  async getTask(
    @Param('id')
    id: string,
  ) {
    return this.taskService.getTaskById(id);
  }

  @Get()
  async getAllTasks(
    @Body()
    input: GetAllTasksDto,
  ) {
    return this.taskService.getAllTasks(input);
  }

  @Put(':id')
  async updateTask(
    @Body()
    input: UpdateTaskDto,
    @Param('id')
    id: string,
  ) {
    return this.taskService.updateTask({ ...input, id });
  }

  @Delete(':id')
  async deleteTask(
    @Param('id')
    id: string,
  ) {
    return this.taskService.deleteTaskById(id);
  }
}
