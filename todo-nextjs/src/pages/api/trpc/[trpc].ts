/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from "@trpc/server/adapters/next";
import prisma from "lib/prisma";
import { z } from "zod";
import { publicProcedure, router } from "../../../server/trpc";
interface ITodos {
  title: string;
  content: string;
  isCompleted: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
const appRouter = router({
  greeting: publicProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(
      z.object({
        name: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        text: `hello ${input?.name ?? "world"}`,
        // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
      };
    }),
  getTodos: publicProcedure.query(async () => {
    const response = await prisma.todo.findMany()
    
    return {
      data: response,
    };
  }),
  addTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        isCompleted: z.boolean().default(false),
        createdAt: z.date().default(new Date()),
        updatedAt: z.date().default(new Date()),
      })
    )
    .mutation(async (data) => {
      const response = await prisma.todo.create({ data: data.input });
      return {
        data: response,
      };
    }),
  // 💡 Tip: Try adding a new procedure here and see if you can use it in the client!
  // getUser: publicProcedure.query(() => {
  //   return { id: '1', name: 'bob' };
  // }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
