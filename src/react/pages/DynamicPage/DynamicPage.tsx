import React from 'react'
import { useLocation } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { WebContainer } from '../../components/WebContainer'
// import { reqMenuRouteInfo } from '@/api'

export default function DynamicPage() {
  const location = useLocation()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>()

  const trigger = useCallback(() => {
    ;(async () => {
      try {
        setError('')
        setUrl('')
        setLoading(true)
        const { pathname, search } = location
        const menuPath = `${pathname}${search}`.substr(6)
        // const { linkUrl } = await reqMenuRouteInfo({ menuPath })
        // setUrl(linkUrl)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    })()
  }, [location])

  useEffect(() => {
    trigger()
  }, [trigger])

  const handleOnload = () => {
    console.log('加载成功 => ', url)
  }

  const handleError = () => {
    console.log('加载错误 => ', url)
    setError('加载错误')
  }

  // if (location.pathname) {
  //   return <iframe src="http://localhost:3001/" />
  // }

  return (
    <>
      {/* {(error || loading) && (
        <Skeleton error={error} loading={loading} onReload={trigger} />
      )}
      {url && !error && (
        <WebContainer url={url} onLoad={handleOnload} onError={handleError} />
      )} */}
    </>
  )
}
