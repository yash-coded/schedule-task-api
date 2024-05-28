import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async createTask(input: Omit<Task, 'id'>) {
    return this.prisma.task.create({ data: input });
  }

  async getTaskById(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async getAllTasks(input: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = input;

    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateTask(input: Partial<Task> & { id: string }) {
    return this.prisma.task.update({
      where: { id: input.id },
      data: input,
    });
  }

  async deleteTaskById(id: string) {
    const response = await this.prisma.task.delete({ where: { id } });

    return response.id;
  }
}
