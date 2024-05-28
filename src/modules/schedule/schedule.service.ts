import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from './schedule.repository';
import { Schedule } from '@prisma/client';
import {
  CreateScheduleDto,
  GetAllSchedulesDto,
  UpdateScheduleDto,
} from '../../entities/dto';

@Injectable()
export class ScheduleService {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async createSchedule(input: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleRepository.createSchedule(input);
  }

  async getScheduleById(id: string): Promise<Schedule> {
    return this.scheduleRepository.getScheduleById(id);
  }

  async getAllSchedules(input: GetAllSchedulesDto): Promise<Schedule[]> {
    return this.scheduleRepository.getAllSchedules(input);
  }

  async updateSchedule(
    input: UpdateScheduleDto & { id: string },
  ): Promise<Schedule> {
    return this.scheduleRepository.updateSchedule(input);
  }

  async deleteScheduleById(id: string): Promise<string> {
    return this.scheduleRepository.deleteScheduleById(id);
  }
}
