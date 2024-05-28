import { faker } from '@faker-js/faker';
import { Task, Type } from '@prisma/client';
import { Factory } from 'fishery';

export const TaskFactory = Factory.define<Task>(() => {
  return {
    id: faker.string.uuid(),
    account_id: faker.number.int(),
    agent_id: faker.number.int(),
    end_time: faker.date.future(),
    start_time: faker.date.past(),
    duration: faker.number.int(),
    schedule_id: faker.string.uuid(),
    type: faker.helpers.arrayElement(Object.values(Type)),
  };
});
