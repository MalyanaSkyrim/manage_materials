import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import Icons from '../../ui/icons'
import classNames from '../../utils/classNames'

import DashboardNavItem, { NavigationItem } from './dashboard-nav-item'

interface Props {
  navigationItems: NavigationItem[]
  subItems?: NavigationItem[]
  isSidebarOpened: boolean
  closeSidebar: () => void
}
const DashboardNav = ({
  navigationItems,
  subItems,
  closeSidebar,
  isSidebarOpened,
}: Props) => {
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        if (typeof closeSidebar === 'function') closeSidebar()
      }
    },
    [closeSidebar],
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [handleClickOutside])

  return (
    <>
      <div
        className={classNames(
          'invisible fixed left-0 top-0 z-20 h-screen w-screen bg-slate-500/30 opacity-0 transition delay-200 ease-in-out',
          isSidebarOpened && 'visible opacity-100',
          'lg:invisible',
        )}></div>
      <aside
        ref={sidebarRef}
        className={classNames(
          'fixed top-0 left-0 z-30 flex h-full w-[250px] -translate-x-[120%] flex-col bg-white px-4 pt-4 shadow-[6px_0_6px_-6px_rgba(0,0,0,0.15)] transition delay-150 ease-in-out',
          'lg:relative lg:translate-x-0 lg:py-0 lg:pl-0',
          isSidebarOpened && 'translate-x-0',
          subItems && 'w-[500px]',
        )}>
        <div className="mb-4 flex items-center space-x-1 lg:hidden">
          <button
            onClick={closeSidebar}
            className="rounded p-1 text-slate-900 hover:bg-slate-100">
            <Icons.x />
          </button>
          <Link href="./" className="flex items-center space-x-2">
            {/* <Icons.logo /> */}
            <div className="space-x-2">
              <span className="text-lg font-bold">Company Name</span>
            </div>
          </Link>
        </div>
        <nav className="h-full space-y-4">
          <div className="hidden min-h-[64px] space-x-2 lg:flex">
            <Link href="./" className="flex items-center space-x-2">
              {/* <Icons.logo /> */}
              <div className="space-x-2">
                <span className="text-lg font-bold">Company Name</span>
              </div>
            </Link>
          </div>
          <div className="flex h-full w-full space-x-4 divide-x">
            <div className="flex-1 items-start space-y-2 ">
              {navigationItems.map((navigationItem) => (
                <DashboardNavItem
                  key={navigationItem.title}
                  navigationItem={navigationItem}
                />
              ))}
            </div>

            {subItems && (
              <div className="flex-1 items-start space-y-2 pl-4">
                {subItems.map((navigationItem) => (
                  <DashboardNavItem
                    key={navigationItem.title}
                    navigationItem={navigationItem}
                  />
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  )
}

export default DashboardNav
