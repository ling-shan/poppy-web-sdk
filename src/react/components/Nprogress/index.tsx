import { useEffect } from 'react'
import { nprogress } from '../../../utils/nprogress'

export function Nprogress() {
  useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  }, [])
  return null
}
