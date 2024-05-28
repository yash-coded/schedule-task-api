import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import {
  CreateTaskDto,
  GetAllTasksDto,
  UpdateTaskDto,
} from '../../entities/dto';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(input: CreateTaskDto) {
    return this.taskRepository.createTask(input);
  }

  async getTaskById(id: string) {
    return this.taskRepository.getTaskById(id);
  }

  async getAllTasks(input: GetAllTasksDto) {
    return this.taskRepository.getAllTasks(input);
  }

  async updateTask(input: UpdateTaskDto & { id: string }) {
    return this.taskRepository.updateTask(input);
  }

  async deleteTaskById(id: string) {
    return this.taskRepository.deleteTaskById(id);
  }
}
