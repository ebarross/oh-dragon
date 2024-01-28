import { render, screen } from '@testing-library/react'
import { describe, expect, test, vitest } from 'vitest'
import { MemoryRouter, Route } from 'react-router-dom'
import DragonDetails from './DragonDetails'
import DragonService from '../../services/dragon-service'
import { Dragon } from '../../types/dragon'

const dragonId = '1'
const dragon: Dragon = {
  id: dragonId,
  name: 'Dragum',
  type: 'fogo',
  histories: '',
  createdAt: '2024-01-27T12:30:57.367Z',
}

function renderComponentWithRouter() {
  render(
    <MemoryRouter initialEntries={[`/dragons/details/${dragonId}`]}>
      <Route path="/dragons/details/:dragonId">
        <DragonDetails />
      </Route>
    </MemoryRouter>
  )
}

describe('DragonDetails', () => {
  test('show heading', () => {
    renderComponentWithRouter()

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeVisible()
    expect(heading).toHaveTextContent(`Detalhes de dragão (#${dragonId})`)
  })

  test('fetch dragon data for provided id', () => {
    const fetchSpy = vitest.spyOn(DragonService, 'fetchDragon')
    renderComponentWithRouter()

    expect(fetchSpy).toBeCalledWith(dragonId)
  })

  test('show message when fetching dragon caused an error', async () => {
    vitest
      .spyOn(DragonService, 'fetchDragon')
      .mockRejectedValueOnce(new Error())
    renderComponentWithRouter()

    const errorMessage = await screen.findByText(
      'Erro ao carregar dragão. Tente novamente.'
    )

    expect(errorMessage).toBeVisible()
  })

  test('show message when fetching dragon is loading', () => {
    vitest.spyOn(DragonService, 'fetchDragon').mockResolvedValueOnce(dragon)
    renderComponentWithRouter()

    const loadingMessage = screen.getByText('Carregando dragão...')

    expect(loadingMessage).toBeVisible()
  })

  test('show name, type, and formatted creation date for dragon', async () => {
    vitest.spyOn(DragonService, 'fetchDragon').mockResolvedValueOnce(dragon)
    renderComponentWithRouter()

    expect(await screen.findByText(dragon.name)).toBeVisible()
    expect(await screen.findByText(dragon.type)).toBeVisible()
    expect(await screen.findByText('27/01/2024 12:30')).toBeVisible()
  })
})
