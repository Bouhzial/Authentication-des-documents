import { createTRPCRouter } from "../../trpc";
import { passwordManagementRouter } from "./passwordManagement";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const authRouter = createTRPCRouter({
    passwordManagement: passwordManagementRouter,
});

