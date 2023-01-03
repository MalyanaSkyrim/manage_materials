import Link from 'next/link'

import DashboardBreadcrumbs from './dashboard-breadcrumbs'
import { NavigationItem } from './dashboard-nav-item'
import Icons from '../../ui/icons'

interface Props {
  openSidebar: () => void
  navigationItems?: NavigationItem[]
  showBreadcrumbs?: boolean
}

const DashboardHeader = ({
  navigationItems,
  openSidebar,
  showBreadcrumbs,
}: Props) => {
  return (
    <header className="flex min-h-[64px] w-full items-center justify-between pr-2 pl-0 lg:pl-2">
      {navigationItems && (
        <div className="flex items-center space-x-6 lg:space-x-0">
          <div className="flex items-center space-x-1 lg:hidden">
            <button
              onClick={openSidebar}
              className="rounded p-1 text-slate-900 hover:bg-slate-100">
              <Icons.menu />
            </button>
            <Link href="./" className="flex items-center space-x-2">
              {/* <Icons.logo /> */}
              <div className="space-x-2">
                <span className="text-lg font-bold">Company Name</span>
              </div>
            </Link>
          </div>
          {showBreadcrumbs ? <DashboardBreadcrumbs /> : <div></div>}
        </div>
      )}
    </header>
  )
}

export default DashboardHeader
