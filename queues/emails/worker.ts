import { Job, Worker } from 'bullmq'
import { redisConnection } from '../redisConnection';
import { sendPasswordConfigurationEmail } from './utils/email-helper';

export enum EmailType {
    configPassword = 'config-password',
    resetPassword = 'reset-password',
}

export interface IEmailJob {
    emailType: EmailType
    userId: number;
    name: string;
    userEmail: string;
}


//email worker handler
const jobHandler = async (job: Job<IEmailJob, boolean>) => {
    const { emailType, userId, name, userEmail } = job.data;

    switch (emailType) {
        case EmailType.configPassword:
            await sendPasswordConfigurationEmail(userId, name, userEmail);
            break;
        case EmailType.resetPassword:
            // await sendResetPasswordEmail(userId, name, userEmail);
            break;
        default:
            throw new Error('Invalid email type');
    }

    return true;
}



console.log("Worker started!");


// Create a new connection in every instance
export const emailsWorker = new Worker('emails', jobHandler, { connection: redisConnection });

emailsWorker.on('completed', job => {
    console.info(`${job.id} has completed!`);
});

emailsWorker.on('failed', (job, err) => {
    console.error(`${job?.id} has failed with ${err.message}`);
});
