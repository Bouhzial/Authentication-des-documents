import { PrismaClient } from "@prisma/client";

import { env } from "../env/server.mjs";

import IORedis from 'ioredis';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
  var redis: IORedis
}

export const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

export const redis =
  global.redis ||
  new IORedis({
    port: Number(env.REDIS_PORT), // Redis port
    host: env.REDIS_HOST, // Redis host
    password: env.REDIS_PASSWORD,
  });


if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
  global.redis = redis;
}
