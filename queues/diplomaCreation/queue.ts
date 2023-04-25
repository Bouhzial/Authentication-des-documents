import { Queue } from 'bullmq'
import { redisConnection } from '../redisConnection';

// Create a new connection in every instance
export const diplomasQueue = new Queue('diplomas', { connection: redisConnection });


export const createDiplomaInBlockChain = async (diplomaId: number) => {
    await diplomasQueue.add('create-diploma', { diplomaId });
}