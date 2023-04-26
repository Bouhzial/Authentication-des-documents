import { Job, Worker } from 'bullmq'
import { redisConnection } from '../redisConnection';
import { checkIfDiplomaExists, createDiplomaContractCall } from './utils/web3-helper';

interface IDiplomaJob {
    id: string;
    diplomaId: number;
}


const jobHandler = async (job: Job<IDiplomaJob, boolean>) => {

    const { diplomaId } = job.data;

    //get the diploma from the database
    const diploma = await checkIfDiplomaExists(diplomaId);

    if (!diploma) {
        throw new Error(`Diploma with id ${diplomaId} not found`);
    }

    if (!diploma.signedByDoyen || !diploma.signedByRector) {
        throw new Error(`Diploma with id ${diplomaId} not signed by doyen and rector at the same time`);
    }

    //create the diploma contract
    await createDiplomaContractCall(diploma);

    return true;
}


console.log("Worker started!");


// Create a new connection in every instance
export const diplomasWorker = new Worker('diplomas', jobHandler, { connection: redisConnection });

diplomasWorker.on('completed', job => {
    console.info(`${job.id} has completed!`);
});

diplomasWorker.on('failed', (job, err) => {
    console.error(`${job?.id} has failed with ${err.message}`);
});
