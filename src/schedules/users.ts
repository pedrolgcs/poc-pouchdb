import schedule from 'node-schedule';

// utils
import { PouchRepository } from '../utils/PouchRepository';

async function processUsers(): Promise<void> {
  console.log('[schedule] - started');

  const users = await PouchRepository.listBySituation('pending');

  if (users.length <= 0) {
    console.log('[schedule] - nothing to do');
    return;
  }

  users.forEach(async (user) => {
    try {
      console.log('[api] - request success');
      await PouchRepository.update({
        ...user,
        situation: 'success',
      });
      console.log('[database] - update in database');
    } catch (error) {
      console.log('[api] - request failed');
      await PouchRepository.update({
        ...user,
        situation: 'failed',
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
