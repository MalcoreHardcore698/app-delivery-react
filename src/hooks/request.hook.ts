import { useState, useCallback } from 'react'

export const useRequest = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}, mode='cors') => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {
        method,
        body,
        headers,
        mode,
        credentials: 'include'
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Wrong something')
      }

      setLoading(false)

      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      return e
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}