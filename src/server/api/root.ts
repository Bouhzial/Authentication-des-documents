import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { diplomesRouter } from "./routers/diplomes";
import { etablismentRouter } from "./routers/etablisment";
import { metaDataRouter } from "./routers/metadata";
import { recteurRouter } from "./routers/recteur/router";
import { issuerRouter } from "./routers/issuer/router";
import { authRouter } from "./routers/auth/router";
import { verificatorRouter } from "./routers/verificator/router";
import { StudentRouter } from "./routers/student/router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  verificator: verificatorRouter,
  recteur: recteurRouter,
  issuer: issuerRouter,
  student: StudentRouter,
  auth: authRouter,
  etablisments: etablismentRouter,
  example: exampleRouter,
  diplomes: diplomesRouter,
  metadata: metaDataRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
