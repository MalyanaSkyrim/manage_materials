import { z } from "zod"

export const infiniteItemsInputSchema = z.object({
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().nullish(),
    filter: z.any(),
  })

  
export type InfiniteItemsInputType = Omit<
z.infer<typeof infiniteItemsInputSchema>,
'filter'
> & {
filter?: { [key: string]: unknown }
}

//Todo: implement a generic getInfiniteModel
//https://linear.app/pragmapos/issue/WEB-305/implement-a-generic-getinfinitemodel
export const getInfiniteModel = async (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
model: any,
input: InfiniteItemsInputType,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
include?: any,
) => {
const limit = input.limit ?? 20
const { cursor, filter } = input
const items = await model.findMany({
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    where: { ...(filter || {}) },
    include,
})
let next: typeof cursor | undefined = null
if (items.length > limit) {
    const nextItem = items.pop()
    next = nextItem?.id ? nextItem.id : null
}
return {
    items,
    next,
}
}