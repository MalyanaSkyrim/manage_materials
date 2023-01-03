// src/server/trpc/router/_app.ts
import { router } from '../trpc'
import resourcesRouter from './resources/resources.router'

export const appRouter = router({
  resources: resourcesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
