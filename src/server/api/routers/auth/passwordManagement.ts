import { Prisma, PrismaClient } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { Role } from "../../../../types/types";
import { createTRPCRouter, protectedProcedure, publicProcedure, recteurProcedure } from "../../trpc";
import { hashSync } from "bcrypt";
import emailjs from 'emailjs-com';

export const t = initTRPC.create();
export const passwordManagementRouter = createTRPCRouter({


    ConfigPassword: t.procedure.input(z.object({
        token: z.string(),
        password: z.string(),
    })).mutation(async ({ input }) => {
        const { token, password } = input

        const passwordConfigToken = await prisma.passwordConfiguration.findFirst({
            where: {
                token: token
            }
        })

        if (!passwordConfigToken || passwordConfigToken?.used || passwordConfigToken?.expires < new Date()) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Token is not valid" });
        }
        await prisma.user.update({
            where: {
                id: passwordConfigToken.user_id
            },
            data: {
                password: hashSync(password, 10)
            }
        })
        //change the used attribute to true
        await prisma.passwordConfiguration.update({
            where: {
                id: passwordConfigToken.id
            },
            data: {
                used: true
            }
        })

        return "Password Changed"
    }),


});
