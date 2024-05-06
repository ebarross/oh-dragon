import { describe, expect, test, vitest } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route } from 'react-router-dom'
import DragonForm from './DragonForm'
import { Dragon } from '../../interfaces/dragon'
import { DragonService } from '../../services/dragon/dragon-service'

const dragonId = '1'
const dragon: Dragon = {
  id: dragonId,
  name: 'Dragum',
  type: 'fogo',
  histories: '',
  createdAt: '2024-01-27T12:30:57.367Z',
}

function renderCreateForm() {
  render(
    <MemoryRouter initialEntries={['/dragons/new']}>
      <Route exact path="/dragons">
        <h1>Dragões</h1>
      </Route>
      <Route path="/dragons/new">
        <DragonForm />
      </Route>
    </MemoryRouter>
  )
}

function renderUpdateForm() {
  render(
    <MemoryRouter initialEntries={[`/dragons/edit/${dragonId}`]}>
      <Route exact path="/dragons">
        <h1>Dragões</h1>
      </Route>
      <Route path="/dragons/edit/:dragonId">
        <DragonForm />
      </Route>
    </MemoryRouter>
  )
}

describe('DragonForm', () => {
  describe('Create form', () => {
    test('show heading', () => {
      renderCreateForm()

      const heading = screen.getByRole('heading', { level: 1 })

      expect(heading).toBeVisible()
      expect(heading).toHaveTextContent('Novo dragão')
    })

    test('show error when name and type are empty', async () => {
      const user = userEvent.setup()
      renderCreateForm()

      const button = screen.getByRole('button', { name: 'Criar' })
      await user.click(button)

      expect(
        screen.getByText('Preencha o nome e o tipo corretamente.')
      ).toBeVisible()
    })

    test('show error when creating dragon returned an error', async () => {
      vitest
        .spyOn(DragonService, 'createDragon')
        .mockRejectedValueOnce(new Error())
      const user = userEvent.setup()
      renderCreateForm()

      const nameInput = screen.getByRole('textbox', { name: /Nome/ })
      const typeInput = screen.getByRole('textbox', { name: /Tipo/ })
      const button = screen.getByRole('button', { name: 'Criar' })

      await user.type(nameInput, 'Dragão branco')
      await user.type(typeInput, 'gelo')
      await user.click(button)

      expect(
        screen.getByText(
          'Houve um erro ao tentar criar um dragão. Tente novamente.'
        )
      ).toBeVisible()
    })

    test('redirect to dragons page when dragon is created', async () => {
      const createSpy = vitest
        .spyOn(DragonService, 'createDragon')
        .mockResolvedValueOnce(dragon)
      const user = userEvent.setup()
      renderCreateForm()

      const nameInput = screen.getByRole('textbox', { name: /Nome/ })
      const typeInput = screen.getByRole('textbox', { name: /Tipo/ })
      const historiesInput = screen.getByRole('textbox', { name: /Histórias/ })
      const button = screen.getByRole('button', { name: 'Criar' })

      await user.type(nameInput, 'Dragão branco')
      await user.type(typeInput, 'gelo')
      await user.type(historiesInput, 'Lorem ipsum dolot sit amet')
      await user.click(button)

      expect(createSpy).toBeCalledWith({
        name: 'Dragão branco',
        type: 'gelo',
        histories: 'Lorem ipsum dolot sit amet',
      })
      expect(
        await screen.findByRole('heading', { name: 'Dragões' })
      ).toBeVisible()
    })
  })

  describe('Update form', () => {
    test('show heading', () => {
      vitest.spyOn(DragonService, 'fetchDragon').mockResolvedValueOnce(dragon)
      renderUpdateForm()

      const heading = screen.getByRole('heading', { level: 1 })

      expect(heading).toBeVisible()
      expect(heading).toHaveTextContent(`Editar dragão #${dragonId}`)
    })

    test('show data filled in inputs when dragon is fetched', async () => {
      vitest.spyOn(DragonService, 'fetchDragon').mockResolvedValueOnce(dragon)
      renderUpdateForm()

      const nameInput = await screen.findByRole('textbox', { name: /Nome/ })
      const typeInput = await screen.findByRole('textbox', { name: /Tipo/ })
      const historiesInput = await screen.findByRole('textbox', {
        name: /Histórias/,
      })

      expect(nameInput).toHaveValue(dragon.name)
      expect(typeInput).toHaveValue(dragon.type)
      expect(historiesInput).toHaveValue(dragon.histories)
    })

    test('show error when name and type are empty', async () => {
      vitest
        .spyOn(DragonService, 'fetchDragon')
        .mockRejectedValueOnce(new Error())
      const user = userEvent.setup()
      renderUpdateForm()

      const button = screen.getByRole('button', { name: 'Salvar' })
      await user.click(button)

      expect(
        await screen.findByText('Preencha o nome e o tipo corretamente.')
      ).toBeVisible()
    })

    test('show error when updating dragon returned an error', async () => {
      vitest.spyOn(DragonService, 'fetchDragon').mockResolvedValueOnce(dragon)
      vitest
        .spyOn(DragonService, 'updateDragon')
        .mockRejectedValueOnce(new Error())
      const user = userEvent.setup()
      renderUpdateForm()

      const button = screen.getByRole('button', { name: 'Salvar' })
      await user.click(button)

      const errorMessage = await screen.findByText(
        'Houve um erro ao tentar atualizar o dragão. Tente novamente.'
      )
      expect(errorMessage).toBeVisible()
    })

    test('redirect to dragons page when dragon is updated', async () => {
      vitest.spyOn(DragonService, 'fetchDragon').mockResolvedValueOnce(dragon)
      const updateDragonSpy = vitest
        .spyOn(DragonService, 'updateDragon')
        .mockResolvedValueOnce(dragon)
      const user = userEvent.setup()
      renderUpdateForm()

      const historiesInput = screen.getByRole('textbox', { name: /Histórias/ })
      const button = screen.getByRole('button', { name: 'Salvar' })

      await user.type(historiesInput, 'Lorem ipsum dolot sit amet')
      await user.click(button)

      expect(updateDragonSpy).toBeCalledWith(dragon.id, {
        name: dragon.name,
        type: dragon.type,
        histories: 'Lorem ipsum dolot sit amet',
      })
      expect(
        await screen.findByRole('heading', { name: 'Dragões' })
      ).toBeVisible()
    })
  })
})
