// src/utils/trpc.ts
import superjson from 'superjson'

import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { AppRouter } from '../trpc/router/_app'




const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  if (process.env.NODE_ENV === 'development')
    return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
  return `http://host.docker.internal:${process.env.PORT ?? 8080}` // else use docker host
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }
  },
  ssr: false,
})


