import schedule from 'node-schedule';

// utils
import { PouchRepository } from '../utils/PouchRepository';

async function processUsers() {
  const users = await PouchRepository.listBySituation('pending');

  if (users.length > 0) {
    return;
  }

  users.forEach((user) => {
    try {
      PouchRepository.update({
        ...user,
        situation: 'success',
      });
    } catch (error) {
      PouchRepository.update({
        ...user,
        situation: 'failed',
      });
    }
  });
}

async function execute() {
  const schedules = Object.keys(schedule.scheduledJobs);

  if (schedules.some((schedule) => schedule === 'processUsers')) {
    schedule.cancelJob('processUsers');
  }

  schedule.scheduleJob('processUsers', '*/30 * * * * *', async () => {
    await processUsers();
  });
}

execute();
