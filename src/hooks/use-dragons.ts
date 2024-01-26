import { useEffect, useState } from 'react'
import DragonService from '../services/dragon-service'
import { Dragon } from '../components/dragon-list/DragonList'

function useDragons() {
  const [data, setData] = useState<Dragon[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    DragonService.fetchDragons()
      .then((dragons) => {
        if (dragons) {
          setData(dragons)
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return {
    data,
    loading,
    error,
  }
}

export default useDragons
