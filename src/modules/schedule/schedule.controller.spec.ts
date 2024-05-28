import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { ScheduleFactory } from '../../../test/factories/schedule.factory';
import { TestBed } from '@automock/jest';

describe('ScheduleController', () => {
  let controller: ScheduleController;
  let stubScheduleService: jest.Mocked<ScheduleService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(ScheduleController).compile();

    controller = unit;
    stubScheduleService = unitRef.get(ScheduleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSchedule', () => {
    it('should return a schedule', async () => {
      const schedule = ScheduleFactory.build();

      stubScheduleService.createSchedule.mockResolvedValue(schedule);

      expect(await controller.createSchedule(schedule)).toEqual(schedule);
    });

    it('should call createSchedule with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await controller.createSchedule(schedule);

      expect(stubScheduleService.createSchedule).toHaveBeenCalledWith(schedule);
    });
  });

  describe('getSchedule', () => {
    it('should return a schedule', async () => {
      const schedule = ScheduleFactory.build();

      stubScheduleService.getScheduleById.mockResolvedValue(schedule);

      const result = await controller.getSchedule(schedule.id);

      expect(result).toEqual(schedule);
    });

    it('should call getScheduleById with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await controller.getSchedule(schedule.id);

      expect(stubScheduleService.getScheduleById).toHaveBeenCalledWith(
        schedule.id,
      );
    });
  });

  describe('getAllSchedules', () => {
    it('should return an array of schedules', async () => {
      const schedules = ScheduleFactory.buildList(2);

      stubScheduleService.getAllSchedules.mockResolvedValue(schedules);

      const result = await controller.getAllSchedules({
        skip: 0,
        take: 10,
      });

      expect(result).toEqual(schedules);
    });

    it('should call getAllSchedules with the correct arguments', async () => {
      await controller.getAllSchedules({
        skip: 0,
        take: 10,
      });

      expect(stubScheduleService.getAllSchedules).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });

  describe('updateSchedule', () => {
    it('should return the updated schedule', async () => {
      const schedule = ScheduleFactory.build();

      stubScheduleService.updateSchedule.mockResolvedValue(schedule);

      const result = await controller.updateSchedule(schedule, schedule.id);

      expect(result).toEqual(schedule);
    });

    it('should call updateSchedule with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await controller.updateSchedule(schedule, schedule.id);

      expect(stubScheduleService.updateSchedule).toHaveBeenCalledWith({
        id: schedule.id,
        ...schedule,
      });
    });
  });

  describe('deleteSchedule', () => {
    it('should return the id of the deleted schedule', async () => {
      const schedule = ScheduleFactory.build();

      stubScheduleService.deleteScheduleById.mockResolvedValue(schedule.id);

      const result = await controller.deleteSchedule(schedule.id);

      expect(result).toEqual(schedule.id);
    });

    it('should call deleteScheduleById with the correct arguments', async () => {
      const schedule = ScheduleFactory.build();

      await controller.deleteSchedule(schedule.id);

      expect(stubScheduleService.deleteScheduleById).toHaveBeenCalledWith(
        schedule.id,
      );
    });
  });
});
