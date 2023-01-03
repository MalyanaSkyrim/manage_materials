
import { Icon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Icons from '../../ui/icons'
import classNames from '../../utils/classNames'



interface BaseNavigationItem {
  title: string
  href: string
  disabled?: boolean
  icon?: Icon
  badgeContent?: string | number
}

interface NavigationSubItem extends BaseNavigationItem {
  subItems?: BaseNavigationItem[]
}

export interface NavigationItem extends BaseNavigationItem {
  subItems?: NavigationSubItem[]
}

interface Props {
  navigationItem: NavigationItem
}

const BaseNavItem = ({
  item,
  path,
  isNested = false,
}: {
  item: NavigationItem
  path: string
  isNested?: boolean
}) => {
  const Icon = item.icon as Icon
  const isItemActive = path.startsWith(item.href)

  return (
    <Link
      key={item.title}
      href={item.disabled ? path : item.href}
      className={classNames(
        'flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100',
        isItemActive ? 'bg-slate-200' : 'transparent',
        item.disabled && 'cursor-not-allowed opacity-50',
        isNested && 'pl-6 text-[13px] font-normal',
      )}>
      <span className="flex items-center">
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        <span>{item.title}</span>
      </span>
      {!!item.badgeContent && (
        <span className="rounded bg-slate-600 px-2.5 py-0.5 text-xs font-medium text-slate-100">
          {item.badgeContent}
        </span>
      )}
    </Link>
  )
}

const DashboardNavItem = ({ navigationItem }: Props) => {
  const router = useRouter()
  const path = router.asPath
  const [isExpanded, setExpanded] = useState(() =>
    path.startsWith(navigationItem.href),
  )
  const toggleExpand = () => setExpanded(!isExpanded)

  const Icon = navigationItem.icon as Icon
  if (navigationItem.subItems && navigationItem.subItems.length > 0)
    return (
      <div className="w-full rounded-md">
        <button
          onClick={toggleExpand}
          className={classNames(
            'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100',
            path === navigationItem.href ? 'bg-slate-200' : 'transparent',
            navigationItem.disabled && 'cursor-not-allowed opacity-50',
          )}>
          <span className="flex items-center">
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            <span>{navigationItem.title}</span>
          </span>
          <Icons.chevronDown
            className={classNames(
              'transition-all duration-200 ease-out',
              isExpanded && 'rotate-180',
            )}
          />
        </button>
        <div
          className="transition-[height] duration-200 ease-out"
          style={{
            height: isExpanded ? navigationItem.subItems.length * 36 : 0,
          }}>
          {isExpanded &&
            navigationItem.subItems.map((item) => (
              <BaseNavItem key={item.title} item={item} path={path} isNested />
            ))}
        </div>
      </div>
    )
  return (
    <BaseNavItem key={navigationItem.title} item={navigationItem} path={path} />
  )
}

export default DashboardNavItem
