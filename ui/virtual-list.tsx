/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'

import { useEffect, useRef } from 'react'
import useElementResize from '../hooks/useElementResize'
import classNames from '../utils/classNames'
import range from '../utils/range'
import EmptyPlaceholder from './empty-placeholder'

import { IconName } from './icons'

interface Props {
  items: unknown[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  columnsNumber?: number
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult>
  renderItem: (item: any, index?: number, array?: any[]) => JSX.Element
  renderItemSkeleton: (item: any, index?: number, array?: any[]) => JSX.Element
  estimateItemSize: () => number
  emptyPlaceholder?: {
    icon?: IconName
    text?: string
  }
}

const getColumnsCount = (width: number | undefined) => {
  if (!width || width > 960) return 3
  if (width > 640) return 2
  return 1
}

const VirtualList = ({
  items,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  columnsNumber,
  renderItem,
  renderItemSkeleton,
  estimateItemSize,
  emptyPlaceholder = {},
}: Props) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const { width } = useElementResize(parentRef.current)
  const columnsCount = columnsNumber || getColumnsCount(width)
  const rowsLength = Math.max(Math.ceil(items.length / columnsCount), 4)
  const rowsCount =
    items.length % columnsCount === 0 && hasNextPage
      ? rowsLength + 1
      : rowsLength

  const rowVirtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateItemSize() + 16,
  })

  const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

  useEffect(() => {
    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= rowsLength - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [hasNextPage, fetchNextPage, rowsLength, isFetchingNextPage, lastItem])

  return (
    <div ref={parentRef} className="flex-1 overflow-scroll pb-4">
      {items?.length ? (
        <div className="relative">
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const virtualRowIndex = virtualRow.index
            const isLoaderRow = virtualRowIndex > rowsLength

            const rowItems = items.slice(
              virtualRowIndex * columnsCount,
              (virtualRow.index + 1) * columnsCount,
            )

            const extendedSkeletons = hasNextPage
              ? range(0, columnsCount - rowItems.length - 1)
              : []

            return (
              <div
                className="absolute w-full"
                key={virtualRow.index}
                style={{
                  top: 0,
                  left: 0,
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}>
                <div
                  className={classNames(
                    'grid grid-cols-3 gap-4',
                    columnsCount === 2 && 'grid-cols-2',
                    columnsCount === 1 && 'grid-cols-1',
                  )}>
                  {isLoaderRow
                    ? range(0, 2).map(renderItemSkeleton)
                    : [
                        ...rowItems.map(renderItem),
                        ...extendedSkeletons.map(renderItemSkeleton),
                      ]}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyPlaceholder className="h-full col-span-3">
          <EmptyPlaceholder.Icon name={emptyPlaceholder.icon || 'post'} />
          <EmptyPlaceholder.Title>
            {emptyPlaceholder.text || 'No items available'}
          </EmptyPlaceholder.Title>
        </EmptyPlaceholder>
      )}
    </div>
  )
}

export default VirtualList
