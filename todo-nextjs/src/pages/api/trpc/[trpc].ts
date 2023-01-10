/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from "@trpc/server/adapters/next";
import prisma from "lib/prisma";
import { z } from "zod";
import { publicProcedure, router } from "../../../server/trpc";

const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    const response = await prisma.todo.findMany();

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
  deleteTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async (data) => {
      const response = await prisma.todo.delete({
        where: {
          id: data.input.id,
        },
      });
      return {
        data: response,
      };
    }),
  markAsComplete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: true,
        },
      });
      return {
        data: response,
      };
    }),
  markAsInComplete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: false,
        },
      });
      return {
        data: response,
      };
    }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
