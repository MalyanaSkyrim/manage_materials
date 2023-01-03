// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from '../../../trpc/router/_app'
import { createContext } from '../../../trpc/context'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`)
        }
      : undefined,
})

export const config = {
  api: {
    responseLimit: false,
  },
}
