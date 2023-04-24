import { createTRPCRouter } from "../../trpc";
import { diplomasRouter } from "./diplomas";



export const StudentRouter = createTRPCRouter({
    diplomas: diplomasRouter
});
