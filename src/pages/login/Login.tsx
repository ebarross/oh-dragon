import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './Login.module.scss'
import { AuthService } from '../../services/auth/auth-service'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email || !password) {
      setErrorMessage('Preencha seu e-mail e senha.')
      return
    }

    setLoading(true)

    AuthService.login({ email, password })
      .then(() => history.push('/dragons'))
      .catch(() => setErrorMessage('E-mail ou senha inválidos.'))
      .finally(() => setLoading(false))
  }

  return (
    <div className={classes.container}>
      <h1>Login</h1>
      <form className={classes.form} onSubmit={submitLogin} noValidate>
        <Input
          type="text"
          label="E-mail:"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Senha:"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage ? (
          <p className={classes.errorMessage}>{errorMessage}</p>
        ) : null}

        <Button type="submit">{loading ? 'Carregando...' : 'Entrar'}</Button>
      </form>
    </div>
  )
}

export default Login
