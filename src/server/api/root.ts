import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { userRouter } from "./routers/users";
import { diplomesRouter } from "./routers/diplomes";
import { etablismentRouter } from "./routers/etablisment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  etablisments: etablismentRouter,
  example: exampleRouter,
  users: userRouter,
  diplomes: diplomesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
