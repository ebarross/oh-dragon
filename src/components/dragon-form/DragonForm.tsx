import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import classes from './DragonForm.module.scss'
import DragonService from '../../services/dragon-service'
import Input from '../input/Input'
import Button from '../button/Button'
import Card from '../card/Card'

type Params = {
  dragonId: string
}

function DragonForm() {
  const history = useHistory()
  const { dragonId } = useParams<Params>()
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [histories, setHistories] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const headingText = dragonId ? `Editar dragão #${dragonId}` : 'Novo dragão'
  const submitButtonLabel = dragonId ? 'Salvar' : 'Criar'

  useEffect(() => {
    if (dragonId) {
      DragonService.fetchDragon(dragonId)
        .then((data) => {
          setName(data.name)
          setType(data.type)
          setHistories(data.histories)
        })
        .catch((err) => console.error(err))
    }
  }, [dragonId])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name || !type) {
      setErrorMessage('Preencha o nome e o tipo corretamente.')
      return
    }

    if (dragonId) {
      updateDragon()
    } else {
      createDragon()
    }
  }

  const createDragon = () => {
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

  const updateDragon = () => {
    const data = {
      name,
      type,
      histories,
    }

    setLoading(true)

    DragonService.updateDragon(dragonId, data)
      .then(() => history.push('/dragons'))
      .catch(() =>
        setErrorMessage(
          'Houve um erro ao tentar atualizar o dragão. Tente novamente.'
        )
      )
      .finally(() => setLoading(false))
  }

  return (
    <Card>
      <h1 className={classes.heading}>{headingText}</h1>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Nome:"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Tipo:"
          value={type}
          required
          onChange={(e) => setType(e.target.value)}
        />
        <Input
          label="Histórias:"
          value={histories}
          onChange={(e) => setHistories(e.target.value)}
        />

        {errorMessage ? (
          <p className={classes.errorMessage}>{errorMessage}</p>
        ) : null}

        <Button type="submit">
          {loading ? 'Carregando...' : submitButtonLabel}
        </Button>
      </form>
    </Card>
  )
}

export default DragonForm
