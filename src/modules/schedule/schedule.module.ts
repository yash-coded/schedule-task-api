import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ScheduleService } from './schedule.service';
import { ScheduleRepository } from './schedule.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}
