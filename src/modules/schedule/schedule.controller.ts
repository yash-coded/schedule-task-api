import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateScheduleDto,
  GetAllSchedulesDto,
  UpdateScheduleDto,
} from '../../entities/dto';
import { ScheduleService } from './schedule.service';
import { Schedule } from '@prisma/client';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post()
  async createSchedule(
    @Body()
    input: CreateScheduleDto,
  ): Promise<Schedule> {
    return this.scheduleService.createSchedule(input);
  }

  @Get(':id')
  async getSchedule(
    @Param('id')
    id: string,
  ): Promise<Schedule> {
    return this.scheduleService.getScheduleById(id);
  }

  @Get()
  async getAllSchedules(
    @Body()
    input: GetAllSchedulesDto,
  ): Promise<Schedule[]> {
    return this.scheduleService.getAllSchedules(input);
  }

  @Put(':id')
  async updateSchedule(
    @Body()
    input: UpdateScheduleDto,
    @Param('id')
    id: string,
  ): Promise<Schedule> {
    return this.scheduleService.updateSchedule({ ...input, id });
  }

  @Delete(':id')
  async deleteSchedule(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.scheduleService.deleteScheduleById(id);
  }
}
