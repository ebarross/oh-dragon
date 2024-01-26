import classes from './Dragons.module.scss'
import useDragons from '../../hooks/use-dragons'
import DragonList from '../dragon-list/DragonList'

function Dragons() {
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
    <div className={classes.container}>
      <h1>Dragões</h1>
      {error ? (
        <div>Erro ao carregar dragões. Tente novamente.</div>
      ) : loading || !orderedDragons ? (
        <div>Carregando dragões...</div>
      ) : (
        <DragonList list={orderedDragons} />
      )}
    </div>
  )
}

export default Dragons
