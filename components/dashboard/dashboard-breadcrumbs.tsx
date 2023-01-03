import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from '../../utils/classNames'



const DashboardBreadcrumbs = () => {
  const router = useRouter()
  const paths = router.asPath.split('/')
  return (
    <div className="flex items-center space-x-1">
      {paths.slice(2).map((link, index, array) => {
        const href = '/dashboard/' + array.slice(0, index + 1).join('/')
        const isLast = index === array.length - 1
        return (
          <div key={href}>
            <Link
              href={href}
              className={classNames(
                'font-light hover:underline',
                isLast && 'font-semibold text-slate-900',
              )}>
              {link}
            </Link>
            {!isLast && <span className="px-1 font-medium">/</span>}
          </div>
        )
      })}
    </div>
  )
}

export default DashboardBreadcrumbs
