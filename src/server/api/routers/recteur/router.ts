import { createTRPCRouter } from "../../trpc";
import { userRouter } from "./users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const recteurRouter = createTRPCRouter({
    users: userRouter,
});

