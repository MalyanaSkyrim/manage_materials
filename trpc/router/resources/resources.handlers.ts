import {
  getInfiniteModel,
  InfiniteItemsInputType,
} from '../../../common/constants'
import { Context } from '../../context'

export const getInfiniteMaterials = ({
  input,
  ctx,
}: {
  ctx: Context
  input: InfiniteItemsInputType
}) => {
  return getInfiniteModel(ctx.db.material, input)
}

export const getSectorsList = ({ ctx }:{ctx: Context}) => {
  return ctx.db.sector.findMany()
}

export const getProvidersList = ({ ctx }:{ctx: Context}) => {
  return ctx.db.provider.findMany()
}