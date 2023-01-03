import { useRouter } from 'next/router'
import { PropsWithChildren, useMemo, useRef, useState } from 'react'
import classNames from '../../utils/classNames'
import { getNavigationItems } from '../../utils/navigation'
import DashboardHeader from './dashboard-header'
import DashboardNav from './dashboard-nav'

interface Props extends PropsWithChildren {
  showBreadcrumbs?: boolean
}

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

const DashboardLayout = ({ children, showBreadcrumbs }: Props) => {
  const [isSidebarOpened, toggleSidebar] = useState<boolean>(false)
  const mainRef = useRef<HTMLElement>(null)

  const router = useRouter()
  const path = router.asPath

  const navigationItems = useMemo(() => getNavigationItems(), [])

  const activeNavItem = useMemo(
    () =>
      navigationItems
        ? navigationItems
            .map((navItem) => navItem?.subItems)
            .flat()
            .find((navItem) => navItem && path.startsWith(navItem.href))
        : undefined,
    [navigationItems, path],
  )

  const subItems = activeNavItem?.subItems

  const openSidebar = () => {
    toggleSidebar(true)
  }

  const closeSidebar = () => {
    toggleSidebar(false)
  }

  return (
    <div className="mx-auto flex h-screen flex-col space-y-4 overflow-hidden px-6">
      {navigationItems ? (
        <div
          className={classNames(
            'grid gap-8 lg:grid-cols-[250px_1fr] lg:gap-10',
            subItems && 'lg:grid-cols-[500px_1fr]',
          )}>
          <DashboardNav
            navigationItems={navigationItems}
            subItems={subItems}
            isSidebarOpened={isSidebarOpened}
            closeSidebar={closeSidebar}
          />
          <main
            ref={mainRef}
            className="flex h-screen w-full flex-1 flex-col space-y-4">
            <DashboardHeader
              navigationItems={navigationItems}
              openSidebar={openSidebar}
              showBreadcrumbs={showBreadcrumbs}
            />
            {children}
          </main>
        </div>
      ) : (
        <main ref={mainRef} className="flex h-screen w-full flex-col space-y-4">
          <DashboardHeader
            navigationItems={navigationItems}
            openSidebar={openSidebar}
            showBreadcrumbs={showBreadcrumbs}
          />
          {children}
        </main>
      )}
    </div>
  )
}

DashboardLayout.MainHeader = function DashboardMainHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide text-slate-900">
          {heading}
        </h1>
        {text && <p className="text-neutral-500">{text}</p>}
      </div>
      {children}
    </div>
  )
}

export default DashboardLayout
