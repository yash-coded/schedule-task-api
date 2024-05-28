import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [ScheduleModule, PrismaModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
