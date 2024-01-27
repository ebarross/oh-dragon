import { useHistory } from 'react-router-dom'
import classes from './Dragons.module.scss'
import useDragons from '../../hooks/useDragons'
import DragonList, { Dragon } from '../dragon-list/DragonList'
import Button from '../button/Button'
import Card from '../card/Card'
import DragonService from '../../services/dragon-service'

function Dragons() {
  const history = useHistory()
  const { data, loading, error, fetch } = useDragons()

  const orderedDragons = data?.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  const removeDragon = (dragonId: Dragon['id']) => {
    const confirmed = confirm('Deseja confirmar a remoção de dragão?')

    if (!confirmed) return

    DragonService.removeDragon(dragonId)
      .then(() => fetch())
      .catch(() => alert('Não foi possível remover o dragão. Tente novamente.'))
  }

  return (
    <Card>
      <header className={classes.header}>
        <h1>Dragões</h1>
        <Button onClick={() => history.push('/dragons/new')}>Adicionar</Button>
      </header>
      {error ? (
        <div>Erro ao carregar dragões. Tente novamente.</div>
      ) : loading || !orderedDragons ? (
        <div>Carregando dragões...</div>
      ) : (
        <DragonList list={orderedDragons} onRemove={removeDragon} />
      )}
    </Card>
  )
}

export default Dragons
