import { NavigationItem } from "../components/dashboard/dashboard-nav-item"
import Icons from "../ui/icons"

export const getNavigationItems = ():NavigationItem[] =>  {
    return  [
        {
          title: 'Materials',
          href: '/materials',
          icon: Icons.folders,
        },
      ]
}