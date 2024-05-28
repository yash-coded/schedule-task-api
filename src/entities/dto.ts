import { Prisma, Schedule, Task } from '@prisma/client';

/**
 * Schedule DTOs
 */
export interface CreateScheduleDto extends Omit<Schedule, 'id'> {}
export interface UpdateScheduleDto extends Omit<Partial<Schedule>, 'id'> {}
export interface GetAllSchedulesDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.ScheduleWhereUniqueInput;
  where?: Prisma.ScheduleWhereInput;
  orderBy?: Prisma.ScheduleOrderByWithRelationInput;
}

/**
 * Task DTOs
 */
export interface CreateTaskDto extends Omit<Task, 'id'> {}
export interface UpdateTaskDto extends Omit<Task, 'id'> {}
export interface GetAllTasksDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.TaskWhereUniqueInput;
  where?: Prisma.TaskWhereInput;
  orderBy?: Prisma.TaskOrderByWithRelationInput;
}
