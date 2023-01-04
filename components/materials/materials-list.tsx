import { Material, Provider, Sector } from '@prisma/client'
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import React from 'react'
import VirtualList from '../../ui/virtual-list'
import classNames from '../../utils/classNames'
import MaterialsItem, {
  AppMaterial,
  MaterialItemSkeleton,
} from './materials-item'

interface Props {
  materials: AppMaterial[]
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult>
  isFetchingNextPage: boolean
  hasNextPage: boolean
}

const MaterialsList = ({
  materials,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: Props) => {
  const renderItem = (material: AppMaterial) => (
    <MaterialsItem key={material.id} material={material} />
  )
  const renderItemSkeleton = (item: number) => (
    <MaterialItemSkeleton key={item} />
  )

  return (
    <VirtualList
      items={materials}
      renderItem={renderItem}
      renderItemSkeleton={renderItemSkeleton}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      estimateItemSize={() => 235}
      columnsNumber={1}
    />
  )
}

export const MaterialsListSkeleton = () => {
  return (
    <div className={classNames('grid grid-cols-1 gap-3')}>
      {[...Array(20)].map((_, i) => (
        <MaterialItemSkeleton key={i} />
      ))}
    </div>
  )
}

export default MaterialsList
