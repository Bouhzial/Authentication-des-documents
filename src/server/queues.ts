import { Queue } from 'bullmq'
import { redis } from './db';


//emails queue 

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



const emailsQueue = new Queue('emails', { connection: redis });


export const createEmailJob = async (jobData: IEmailJob) => {
    await emailsQueue.add('emailJob', jobData);
}

//diplomas queue

const diplomasQueue = new Queue('diplomas', { connection: redis });


export const createDiplomaInBlockChain = async (diplomaId: number) => {
    await diplomasQueue.add('create-diploma', { diplomaId });
}