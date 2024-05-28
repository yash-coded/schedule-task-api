import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Schedule } from '@prisma/client';

@Injectable()
export class ScheduleRepository {
  constructor(private prisma: PrismaService) {}

  async createSchedule(input: Omit<Schedule, 'id'>) {
    return this.prisma.schedule.create({ data: input });
  }

  async getScheduleById(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }

  async getAllSchedules(input: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ScheduleWhereUniqueInput;
    where?: Prisma.ScheduleWhereInput;
    orderBy?: Prisma.ScheduleOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = input;

    return this.prisma.schedule.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateSchedule(input: Partial<Schedule> & { id: string }) {
    return this.prisma.schedule.update({
      where: { id: input.id },
      data: input,
    });
  }

  async deleteScheduleById(id: string) {
    const response = await this.prisma.schedule.delete({ where: { id } });

    return response.id;
  }
}
