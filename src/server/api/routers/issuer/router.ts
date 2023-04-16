import { createTRPCRouter } from "../../trpc";
import { diplomasRouter } from "./diplomas";
import { studentsRouter } from "./students";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const issuerRouter = createTRPCRouter({
    students: studentsRouter,
    diplomas: diplomasRouter
});

