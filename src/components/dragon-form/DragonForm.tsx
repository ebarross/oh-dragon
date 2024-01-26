import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './DragonForm.module.scss'
import DragonService from '../../services/dragon-service'
import Input from '../input/Input'
import Button from '../button/Button'
import Card from '../card/Card'

function DragonForm() {
  const history = useHistory()
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [histories, setHistories] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const create = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name || !type || !histories) {
      setErrorMessage('Preencha todos os campos corretamente.')
      return
    }

    const data = {
      name,
      type,
      histories,
    }

    setLoading(true)

    DragonService.createDragon(data)
      .then(() => history.push('/dragons'))
      .catch(() =>
        setErrorMessage(
          'Houve um erro ao tentar criar um dragão. Tente novamente.'
        )
      )
      .finally(() => setLoading(false))
  }

  return (
    <Card>
      <h1 className={classes.heading}>Novo dragão</h1>
      <form className={classes.form} onSubmit={create}>
        <Input
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Tipo"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <Input
          label="Histórias"
          value={histories}
          onChange={(e) => setHistories(e.target.value)}
        />

        {errorMessage ? (
          <p className={classes.errorMessage}>{errorMessage}</p>
        ) : null}

        <Button type="submit">{loading ? 'Carregando...' : 'Criar'}</Button>
      </form>
    </Card>
  )
}

export default DragonForm
