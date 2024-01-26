import { Dragon } from '../components/dragon-list/DragonList'

const API_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1'

async function fetchDragons(): Promise<Dragon[]> {
  const url = `${API_URL}/dragon`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Network error')
  }

  return await response.json()
}

type NewDragon = Pick<Dragon, 'name' | 'type' | 'histories'>

async function createDragon(newDragon: NewDragon): Promise<Dragon> {
  const url = `${API_URL}/dragon`
  const data = { ...newDragon }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Network error')
  }

  return await response.json()
}

export default { fetchDragons, createDragon }
