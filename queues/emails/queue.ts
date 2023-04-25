import { Queue } from 'bullmq'
import { redisConnection } from '../redisConnection';
import { EmailType, IEmailJob } from './worker';

// Create a new connection in every instance
export const emailsQueue = new Queue('emails', { connection: redisConnection });


export const createEmailJob = async (jobData: IEmailJob) => {
    await emailsQueue.add('emailJob', jobData);
}