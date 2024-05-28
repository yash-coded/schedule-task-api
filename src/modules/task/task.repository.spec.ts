import { PrismaService } from '../prisma/prisma.service';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TaskFactory } from '../../../test/factories/task.factory';

describe('TaskRepository', () => {
  let repository: TaskRepository;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    repository = module.get(TaskRepository);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createTask', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      prisma.task.create = jest.fn().mockResolvedValue(task);

      expect(await repository.createTask(task)).toEqual(task);
    });

    it('should call create with the correct arguments', async () => {
      const task = TaskFactory.build();

      await repository.createTask(task);

      expect(prisma.task.create).toHaveBeenCalledWith({
        data: task,
      });
    });
  });

  describe('getTaskById', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      prisma.task.findUnique = jest.fn().mockResolvedValue(task);

      expect(await repository.getTaskById(task.id)).toEqual(task);
    });

    it('should call findUnique with the correct arguments', async () => {
      const task = TaskFactory.build();

      await repository.getTaskById(task.id);

      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: task.id },
      });
    });
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks = TaskFactory.buildList(3);

      prisma.task.findMany = jest.fn().mockResolvedValue(tasks);

      const input = {
        take: 10,
        skip: 0,
      };

      expect(await repository.getAllTasks(input)).toEqual(tasks);
    });
  });

  describe('updateTask', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      prisma.task.update = jest.fn().mockResolvedValue(task);

      expect(await repository.updateTask(task)).toEqual(task);
    });

    it('should call update with the correct arguments', async () => {
      const task = TaskFactory.build();

      await repository.updateTask(task);

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: task.id },
        data: task,
      });
    });
  });

  describe('deleteTask', () => {
    it('should return a task', async () => {
      const task = TaskFactory.build();

      prisma.task.delete = jest.fn().mockResolvedValue(task);

      expect(await repository.deleteTaskById(task.id)).toEqual(task.id);
    });

    it('should call delete with the correct arguments', async () => {
      const task = TaskFactory.build();

      prisma.task.delete = jest.fn().mockResolvedValue(task);

      await repository.deleteTaskById(task.id);

      expect(prisma.task.delete).toHaveBeenCalledWith({
        where: { id: task.id },
      });
    });
  });
});
