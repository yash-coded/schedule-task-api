import { Factory } from 'fishery';
import { Schedule } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const ScheduleFactory = Factory.define<Schedule>(() => {
  return {
    id: faker.string.uuid(),
    account_id: faker.number.int(),
    agent_id: faker.number.int(),
    end_time: faker.date.future(),
    start_time: faker.date.past(),
  };
});
