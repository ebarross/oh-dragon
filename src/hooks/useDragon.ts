import { useEffect, useState } from 'react'
import DragonService from '../services/dragon-service'
import { Dragon } from '../components/dragon-list/DragonList'

function useDragon(dragonId: Dragon['id']) {
  const [data, setData] = useState<Dragon | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    DragonService.fetchDragon(dragonId)
      .then((dragon) => {
        if (dragon) {
          setData(dragon)
          setError(null)
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [dragonId])

  return {
    data,
    loading,
    error,
  }
}

export default useDragon
