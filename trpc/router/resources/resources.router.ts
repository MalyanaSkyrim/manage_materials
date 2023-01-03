import { publicProcedure } from '../../trpc'
import { infiniteItemsInputSchema } from '../../../utils/constants'
import { router } from '../../trpc'
import {
  getInfiniteMaterials,
  getProvidersList,
  getSectorsList,
} from './resources.handlers'

const resourcesRouter = router({
  infiniteMaterials: publicProcedure
    .input(infiniteItemsInputSchema)
    .query(getInfiniteMaterials),

  getSectorsList: publicProcedure.query(getSectorsList),
  getProvidersList: publicProcedure.query(getProvidersList),
})

export default resourcesRouter
