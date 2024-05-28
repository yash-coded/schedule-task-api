import { ScheduleFactory } from '../../../test/factories/schedule.factory';
import { ScheduleRepository } from './schedule.repository';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('ScheduleRepository', () => {
  let repository: ScheduleRepository;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    repository = module.get(ScheduleRepository);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createSchedule', () => {
    it('should return a schedule', async () => {
      const schedule = ScheduleFactory.build();

      prisma.schedule.create = jest.fn().mockResolvedValue(schedule);

      expect(await repository.createSchedule(schedule)).toEqual(schedule);
    });

    it('should call create with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await repository.createSchedule(schedule);

      expect(prisma.schedule.create).toHaveBeenCalledWith({
        data: schedule,
      });
    });
  });

  describe('getScheduleById', () => {
    it('should return a schedule', async () => {
      const schedule = ScheduleFactory.build();

      prisma.schedule.findUnique = jest.fn().mockResolvedValue(schedule);

      expect(await repository.getScheduleById(schedule.id)).toEqual(schedule);
    });

    it('should call findUnique with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await repository.getScheduleById(schedule.id);

      expect(prisma.schedule.findUnique).toHaveBeenCalledWith({
        where: { id: schedule.id },
      });
    });
  });

  describe('getAllSchedules', () => {
    it('should return a list of schedules', async () => {
      const schedules = ScheduleFactory.buildList(2);

      prisma.schedule.findMany = jest.fn().mockResolvedValue(schedules);
      const input = {
        skip: 0,
        take: 10,
      };

      expect(await repository.getAllSchedules(input)).toEqual(schedules);
    });

    it('should call findMany with the correct arguments', async () => {
      const input = {
        skip: 0,
        take: 10,
      };

      await repository.getAllSchedules(input);

      expect(prisma.schedule.findMany).toHaveBeenCalledWith(input);
    });
  });

  describe('updateSchedule', () => {
    it('should return a schedule', async () => {
      const schedule = ScheduleFactory.build();

      prisma.schedule.update = jest.fn().mockResolvedValue(schedule);

      expect(await repository.updateSchedule(schedule)).toEqual(schedule);
    });

    it('should call update with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await repository.updateSchedule(schedule);

      expect(prisma.schedule.update).toHaveBeenCalledWith({
        where: { id: schedule.id },
        data: schedule,
      });
    });
  });

  describe('deleteScheduleById', () => {
    it('should return the id of the deleted schedule', async () => {
      const schedule = ScheduleFactory.build();

      prisma.schedule.delete = jest.fn().mockResolvedValue(schedule);

      expect(await repository.deleteScheduleById(schedule.id)).toEqual(
        schedule.id,
      );
    });

    it('should call delete with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();
      prisma.schedule.delete = jest.fn().mockResolvedValue(schedule);

      await repository.deleteScheduleById(schedule.id);

      expect(prisma.schedule.delete).toHaveBeenCalledWith({
        where: { id: schedule.id },
      });
    });
  });
});
