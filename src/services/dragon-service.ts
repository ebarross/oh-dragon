import { Dragon } from '../components/dragon-list/DragonList'

const API_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1'

const fetchDragons = async (): Promise<Dragon[]> => {
  const url = `${API_URL}/dragon`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Network error')
  }

  return await response.json()
}

export default { fetchDragons }
