import { ScheduleService } from './schedule.service';
import { ScheduleFactory } from '../../../test/factories/schedule.factory';
import { TestBed } from '@automock/jest';
import { ScheduleRepository } from './schedule.repository';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let stubScheduleRepository: jest.Mocked<ScheduleRepository>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(ScheduleService).compile();

    service = unit;
    stubScheduleRepository = unitRef.get(ScheduleRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSchedule', () => {
    it('should return a schedule', async () => {
      const schedule = ScheduleFactory.build();

      stubScheduleRepository.createSchedule.mockResolvedValue(schedule);

      expect(await service.createSchedule(schedule)).toEqual(schedule);
    });

    it('should call createSchedule with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await service.createSchedule(schedule);

      expect(stubScheduleRepository.createSchedule).toHaveBeenCalledWith(
        schedule,
      );
    });
  });

  describe('getScheduleById', () => {
    it('should return a schedule', async () => {
      const schedule = ScheduleFactory.build();

      stubScheduleRepository.getScheduleById.mockResolvedValue(schedule);

      const result = await service.getScheduleById(schedule.id);

      expect(result).toEqual(schedule);
    });

    it('should call getScheduleById with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await service.getScheduleById(schedule.id);

      expect(stubScheduleRepository.getScheduleById).toHaveBeenCalledWith(
        schedule.id,
      );
    });
  });

  describe('getAllSchedules', () => {
    it('should return an array of schedules', async () => {
      const schedules = ScheduleFactory.buildList(3);

      stubScheduleRepository.getAllSchedules.mockResolvedValue(schedules);

      const result = await service.getAllSchedules({
        skip: 0,
        take: 10,
      });

      expect(result).toEqual(schedules);
    });

    it('should call getAllSchedules with the correct arguments', async () => {
      const input = {
        skip: 0,
        take: 10,
      };

      await service.getAllSchedules(input);

      expect(stubScheduleRepository.getAllSchedules).toHaveBeenCalledWith(
        input,
      );
    });
  });

  describe('updateSchedule', () => {
    it('should return a schedule', async () => {
      const schedule = ScheduleFactory.build();

      stubScheduleRepository.updateSchedule.mockResolvedValue(schedule);

      expect(await service.updateSchedule(schedule)).toEqual(schedule);
    });

    it('should call updateSchedule with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await service.updateSchedule(schedule);

      expect(stubScheduleRepository.updateSchedule).toHaveBeenCalledWith(
        schedule,
      );
    });
  });

  describe('deleteScheduleById', () => {
    it('should return a string', async () => {
      const schedule = ScheduleFactory.build();

      stubScheduleRepository.deleteScheduleById.mockResolvedValue(schedule.id);

      expect(await service.deleteScheduleById(schedule.id)).toEqual(
        schedule.id,
      );
    });

    it('should call deleteScheduleById with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await service.deleteScheduleById(schedule.id);

      expect(stubScheduleRepository.deleteScheduleById).toHaveBeenCalledWith(
        schedule.id,
      );
    });
  });
});
