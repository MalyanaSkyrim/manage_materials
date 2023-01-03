import { useCallback, useEffect, useState } from 'react'

interface Size {
  width: number
  height: number
}

function useElementResize<T extends HTMLElement = HTMLDivElement>(
  node: T | null,
): Size {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.

  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  // Prevent too many rendering using useCallback
  const handleResize = useCallback(() => {
    setSize({
      width: node?.offsetWidth || 0,
      height: node?.offsetHeight || 0,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.offsetHeight, node?.offsetWidth])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useEffect(() => {
    handleResize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.offsetHeight, node?.offsetWidth])

  return size
}

export default useElementResize
