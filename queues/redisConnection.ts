import { ConnectionOptions } from "bullmq";
import * as dotenv from 'dotenv';
dotenv.config();

export const redisConnection: ConnectionOptions = {
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: Number(process.env?.REDIS_PORT),
}