import {
  getInfiniteModel,
  InfiniteItemsInputType,
} from '../../../utils/constants'
import { Context } from '../../context'

export const getInfiniteMaterials = ({
  input,
  ctx,
}: {
  ctx: Context
  input: InfiniteItemsInputType
}) => {
  return getInfiniteModel(ctx.db.material, input, {
    provider: true,
    sector: true,
  })
}

export const getSectorsList = ({ ctx }: { ctx: Context }) => {
  return ctx.db.sector.findMany()
}

export const getProvidersList = ({ ctx }: { ctx: Context }) => {
  return ctx.db.provider.findMany()
}
