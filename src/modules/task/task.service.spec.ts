import { TestBed } from '@automock/jest';
import { TaskFactory } from '../../../test/factories/task.factory';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: jest.Mocked<TaskRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(TaskService).compile();

    service = unit;
    taskRepository = unitRef.get(TaskRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      taskRepository.createTask.mockResolvedValue(task);

      expect(await service.createTask(task)).toEqual(task);
    });

    it('should call createTask with the correct arguments', async () => {
      const task = TaskFactory.build();

      await service.createTask(task);

      expect(taskRepository.createTask).toHaveBeenCalledWith(task);
    });
  });

  describe('getTaskById', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      taskRepository.getTaskById.mockResolvedValue(task);

      expect(await service.getTaskById(task.id)).toEqual(task);
    });

    it('should call getTaskById with the correct arguments', async () => {
      const task = TaskFactory.build();

      await service.getTaskById(task.id);

      expect(taskRepository.getTaskById).toHaveBeenCalledWith(task.id);
    });
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks = TaskFactory.buildList(3);

      taskRepository.getAllTasks.mockResolvedValue(tasks);

      const input = {
        skip: 0,
        take: 10,
      };

      expect(await service.getAllTasks(input)).toEqual(tasks);
    });

    it('should call getAllTasks with the correct arguments', async () => {
      const input = {
        skip: 0,
        take: 10,
      };
      await service.getAllTasks(input);

      expect(taskRepository.getAllTasks).toHaveBeenCalled();
    });
  });

  describe('updateTask', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      taskRepository.updateTask.mockResolvedValue(task);

      expect(await service.updateTask(task)).toEqual(task);
    });

    it('should call updateTask with the correct arguments', async () => {
      const task = TaskFactory.build();

      await service.updateTask(task);

      expect(taskRepository.updateTask).toHaveBeenCalledWith(task);
    });
  });

  describe('deleteTaskById', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      taskRepository.deleteTaskById.mockResolvedValue(task.id);

      expect(await service.deleteTaskById(task.id)).toEqual(task.id);
    });

    it('should call deleteTaskById with the correct arguments', async () => {
      const task = TaskFactory.build();

      await service.deleteTaskById(task.id);

      expect(taskRepository.deleteTaskById).toHaveBeenCalledWith(task.id);
    });
  });
});
