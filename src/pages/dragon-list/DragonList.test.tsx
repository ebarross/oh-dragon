import { describe, expect, test, vitest } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route } from 'react-router-dom'
import DragonList from './DragonList'
import { Dragon } from '../../interfaces/dragon'
import { DragonService } from '../../services/dragon/dragon-service'

describe('Dragons', () => {
  const dragons: Dragon[] = [
    {
      id: '1',
      name: 'Dragão 1',
      type: 'fogo',
      histories: '',
      createdAt: '2024-01-27T12:30:57.367Z',
    },
    {
      id: '2',
      name: 'Dragão 2',
      type: 'agua',
      histories: '',
      createdAt: '2024-01-28T09:02:11.020Z',
    },
  ]

  test('show heading', () => {
    render(<DragonList />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeVisible()
    expect(heading).toHaveTextContent('Dragões')
  })

  test('show message when fetching dragons caused an error', async () => {
    vitest
      .spyOn(DragonService, 'fetchDragons')
      .mockRejectedValueOnce(new Error())
    render(<DragonList />)

    const errorMessage = await screen.findByText(
      'Erro ao carregar dragões. Tente novamente.'
    )

    expect(errorMessage).toBeVisible()
  })

  test('show message when fetching dragons is loading', () => {
    vitest.spyOn(DragonService, 'fetchDragons').mockResolvedValueOnce([])
    render(<DragonList />)

    const loadingMessage = screen.getByText('Carregando dragões...')

    expect(loadingMessage).toBeVisible()
  })

  test('show message when there is no dragons', async () => {
    vitest.spyOn(DragonService, 'fetchDragons').mockResolvedValueOnce([])
    render(<DragonList />)

    const noDataMessage = await screen.findByText('Não há dragões cadastrados.')

    expect(noDataMessage).toBeVisible()
  })

  test('show table for dragon data', async () => {
    vitest.spyOn(DragonService, 'fetchDragons').mockResolvedValueOnce(dragons)
    render(<DragonList />)

    const table = await screen.findByRole('table')

    expect(table).toBeVisible()
  })

  test('show id, name, and type for each one on the dragon list provided', async () => {
    vitest.spyOn(DragonService, 'fetchDragons').mockResolvedValueOnce(dragons)
    render(<DragonList />)

    for (const dragon of dragons) {
      expect(await screen.findByText(dragon.id)).toBeVisible()
      expect(await screen.findByText(dragon.name)).toBeVisible()
      expect(await screen.findByText(dragon.type)).toBeVisible()
    }
  })

  test('show view, edit, and remove buttons for each one on the dragon list provided', async () => {
    vitest.spyOn(DragonService, 'fetchDragons').mockResolvedValueOnce(dragons)
    render(<DragonList />)

    const viewButtons = await screen.findAllByRole('button', {
      name: 'Ver detalhes',
    })
    const editButtons = await screen.findAllByRole('button', { name: 'Editar' })
    const removeButtons = await screen.findAllByRole('button', {
      name: 'Remover',
    })

    expect(viewButtons).toHaveLength(dragons.length)
    expect(editButtons).toHaveLength(dragons.length)
    expect(removeButtons).toHaveLength(dragons.length)
  })

  test('show confirm message when remove button is clicked', async () => {
    const user = userEvent.setup()
    vitest.spyOn(DragonService, 'fetchDragons').mockResolvedValueOnce(dragons)
    const confirmSpy = vitest.spyOn(window, 'confirm')
    render(<DragonList />)

    const [firstRemoveButton] = await screen.findAllByRole('button', {
      name: 'Remover',
    })
    await user.click(firstRemoveButton)

    expect(confirmSpy).toBeCalledWith('Deseja confirmar a remoção de dragão?')
  })

  test('remove dragon when remove action is confirmed', async () => {
    const user = userEvent.setup()
    vitest.spyOn(DragonService, 'fetchDragons').mockResolvedValueOnce(dragons)
    vitest.spyOn(window, 'confirm').mockReturnValueOnce(true)
    const removeSpy = vitest.spyOn(DragonService, 'removeDragon')
    render(<DragonList />)

    const [firstRemoveButton] = await screen.findAllByRole('button', {
      name: 'Remover',
    })
    await user.click(firstRemoveButton)

    expect(removeSpy).toBeCalledWith(dragons[0].id)
  })

  test('redirect to details when view button is clicked', async () => {
    const user = userEvent.setup()
    vitest.spyOn(DragonService, 'fetchDragons').mockResolvedValueOnce(dragons)
    render(
      <MemoryRouter initialEntries={['/dragons', '/dragons/details/:dragonId']}>
        <Route path="/dragons">
          <DragonList />
        </Route>
        <Route path="/dragons/details/1">
          <h1>Detalhes de dragão #1</h1>
        </Route>
      </MemoryRouter>
    )

    const [viewButton] = await screen.findAllByRole('button', {
      name: 'Ver detalhes',
    })
    await user.click(viewButton)

    expect(screen.getByText('Detalhes de dragão #1')).toBeVisible()
  })

  test('redirect to edit form when edit button is clicked', async () => {
    const user = userEvent.setup()
    vitest.spyOn(DragonService, 'fetchDragons').mockResolvedValueOnce(dragons)
    render(
      <MemoryRouter initialEntries={['/dragons', '/dragons/edit/:dragonId']}>
        <Route path="/dragons">
          <DragonList />
        </Route>
        <Route path="/dragons/edit/1">
          <h1>Editar dragão #1</h1>
        </Route>
      </MemoryRouter>
    )

    const [editButton] = await screen.findAllByRole('button', {
      name: 'Editar',
    })
    await user.click(editButton)

    expect(screen.getByText('Editar dragão #1')).toBeVisible()
  })
})
