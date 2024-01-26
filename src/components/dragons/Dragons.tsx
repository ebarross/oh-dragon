import { useHistory } from 'react-router-dom'
import classes from './Dragons.module.scss'
import useDragons from '../../hooks/use-dragons'
import DragonList from '../dragon-list/DragonList'
import Button from '../button/Button'
import Card from '../card/Card'

function Dragons() {
  const history = useHistory()
  const { data, loading, error } = useDragons()

  const orderedDragons = data?.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

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
        <DragonList list={orderedDragons} />
      )}
    </Card>
  )
}

export default Dragons
