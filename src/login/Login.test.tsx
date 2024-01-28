import { describe, test, expect, vitest } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route } from 'react-router-dom'
import Login from './Login'
import AuthService from '../services/auth-service'

describe('Login', () => {
  test('show error when data is not provided', async () => {
    const user = userEvent.setup()
    render(<Login />)

    const button = screen.getByRole('button', { name: 'Entrar' })
    await user.click(button)

    expect(screen.getByText('Preencha seu e-mail e senha.')).toBeVisible()
  })

  test('show error when email or password are wrong', async () => {
    vitest.spyOn(AuthService, 'login').mockRejectedValueOnce(undefined)
    const user = userEvent.setup()
    render(<Login />)

    const button = screen.getByRole('button', { name: 'Entrar' })
    const emailInput = screen.getByRole('textbox', { name: /E-mail/ })
    const passwordInput = screen.getByLabelText(/Senha/)

    await user.type(emailInput, 'email@example.com')
    await user.type(passwordInput, 'wrong_password')
    await user.click(button)

    const errorMessage = await screen.findByText('E-mail ou senha inválidos.')

    expect(errorMessage).toBeVisible()
  })

  test('show redirect to dragons page when email and password are valid', async () => {
    vitest.spyOn(AuthService, 'login').mockResolvedValueOnce()
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/login', '/dragons']}>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dragons">
          <h1>Dragões</h1>
        </Route>
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: 'Entrar' })
    const emailInput = screen.getByRole('textbox', { name: /E-mail/ })
    const passwordInput = screen.getByLabelText(/Senha/)

    await user.type(emailInput, 'email@example.com')
    await user.type(passwordInput, 'corrent_password')
    await user.click(button)

    const dragonsPageTitle = screen.getByRole('heading', { name: 'Dragões' })

    expect(dragonsPageTitle).toBeVisible()
  })
})
