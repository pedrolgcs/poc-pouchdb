import schedule from 'node-schedule';

// utils
import { UsersRepository } from '../utils/PouchDB/UsersRepository';

async function processUsers(): Promise<void> {
  console.log('[schedule] - started');

  const users = await UsersRepository.listByGender('male');

  if (users.length <= 0) {
    console.log('[schedule] - nothing to do');
    return;
  }

  users.forEach(async (user) => {
    try {
      console.log('[api] - request success');
      await UsersRepository.update({
        ...user,
      });
      console.log('[database] - update in database');
    } catch (error) {
      console.log('[api] - request failed');
      await UsersRepository.update({
        ...user,
      });
      console.log('[database] - update in database');
    }
  });
}

async function execute(): Promise<void> {
  const schedules = Object.keys(schedule.scheduledJobs);

  if (schedules.some((schedule) => schedule === 'processUsers')) {
    schedule.cancelJob('processUsers');
  }

  schedule.scheduleJob('processUsers', '*/30 * * * * *', async () => {
    await processUsers();
  });
}

execute();
