import { TestBed } from '@automock/jest';
import { TaskFactory } from '../../../test/factories/task.factory';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;
  let taskService: jest.Mocked<TaskService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(TaskController).compile();

    controller = unit;
    taskService = unitRef.get(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      taskService.createTask.mockResolvedValue(task);

      expect(await controller.createTask(task)).toEqual(task);
    });

    it('should call createTask with the correct arguments', async () => {
      const task = TaskFactory.build();

      await controller.createTask(task);

      expect(taskService.createTask).toHaveBeenCalledWith(task);
    });
  });

  describe('getTask', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      taskService.getTaskById.mockResolvedValue(task);

      const result = await controller.getTask(task.id);

      expect(result).toEqual(task);
    });

    it('should call getTaskById with the correct arguments', async () => {
      const task = TaskFactory.build();

      await controller.getTask(task.id);

      expect(taskService.getTaskById).toHaveBeenCalledWith(task.id);
    });
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks = TaskFactory.buildList(3);

      taskService.getAllTasks.mockResolvedValue(tasks);

      const result = await controller.getAllTasks({});

      expect(result).toEqual(tasks);
    });

    it('should call getAllTasks with the correct arguments', async () => {
      const input = {};

      await controller.getAllTasks(input);

      expect(taskService.getAllTasks).toHaveBeenCalledWith(input);
    });
  });

  describe('updateTask', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      taskService.updateTask.mockResolvedValue(task);

      expect(await controller.updateTask(task, task.id)).toEqual(task);
    });

    it('should call updateTask with the correct arguments', async () => {
      const task = TaskFactory.build();

      await controller.updateTask(task, task.id);

      expect(taskService.updateTask).toHaveBeenCalledWith(task);
    });
  });

  describe('deleteTask', () => {
    it('should return the task id', async () => {
      const task = TaskFactory.build();

      taskService.deleteTaskById.mockResolvedValue(task.id);

      expect(await controller.deleteTask(task.id)).toEqual(task.id);
    });

    it('should call deleteTaskById with the correct arguments', async () => {
      const task = TaskFactory.build();

      await controller.deleteTask(task.id);

      expect(taskService.deleteTaskById).toHaveBeenCalledWith(task.id);
    });
  });
});
