import { createTRPCRouter } from "../../trpc";
import { diplomasRouter } from "./diplomas";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const verificatorRouter = createTRPCRouter({
    diplomas: diplomasRouter
});

