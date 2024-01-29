import { useCallback, useEffect, useState } from 'react'
import DragonService from '../services/dragon-service'
import { Dragon } from '../types/dragon'

function useDragons() {
  const [data, setData] = useState<Dragon[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = useCallback(() => {
    setLoading(true)

    DragonService.fetchDragons({ sortBy: 'name' })
      .then((dragons) => {
        if (dragons) {
          setData(dragons)
          setError(null)
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    data,
    loading,
    error,
    fetch,
  }
}

export default useDragons
