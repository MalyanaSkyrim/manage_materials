import classNames from '../utils/classNames'
import Icons from './icons'

interface EmptyPlaceholderIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons
}
type EmptyPlaceholderProps = React.HTMLAttributes<HTMLDivElement>
type EmptyPlaceholderTitleProps = React.HTMLAttributes<HTMLHeadingElement>
type EmptyPlaceholderDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>

const EmptyPlaceholder = ({
  className,
  children,
  ...props
}: EmptyPlaceholderProps) => {
  return (
    <div
      className={classNames(
        'animate-in fade-in-50 flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center',
        className,
      )}
      {...props}>
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  )
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
  name,
  className,
  ...props
}: EmptyPlaceholderIconProps) {
  const Icon = Icons[name]

  if (!Icon) {
    return null
  }

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
      <Icon className={classNames('h-10 w-10', className)} {...props} />
    </div>
  )
}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: EmptyPlaceholderTitleProps) {
  return (
    <h2
      className={classNames('mt-6 text-xl font-semibold', className)}
      {...props}
    />
  )
}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: EmptyPlaceholderDescriptionProps) {
  return (
    <p
      className={classNames(
        'mt-3 mb-8 text-center text-sm font-normal leading-6 text-slate-700',
        className,
      )}
      {...props}
    />
  )
}

export default EmptyPlaceholder
