import { useParams } from 'react-router-dom'
import classes from './DragonDetails.module.scss'
import useDragon from '../../hooks/useDragon'
import Card from '../../components/card/Card'
import { formatDateTime } from '../../utils/date'

type Params = {
  dragonId: string
}

function DragonDetails() {
  const { dragonId } = useParams<Params>()
  const { data: dragon, error, loading } = useDragon(dragonId)

  return (
    <Card>
      <header className={classes.header}>
        <h1>Detalhes de dragão (#{dragonId})</h1>
      </header>
      {error ? (
        <div>Erro ao carregar dragão. Tente novamente.</div>
      ) : loading || !dragon ? (
        <div>Carregando dragão...</div>
      ) : (
        <div className={classes.infos}>
          <div className={classes.info}>
            <p>Nome:</p>
            <p>{dragon.name}</p>
          </div>
          <div className={classes.info}>
            <p>Tipo:</p>
            <p>{dragon.type}</p>
          </div>
          <div className={classes.info}>
            <p>Data de criação:</p>
            <p>{formatDateTime(dragon.createdAt)}</p>
          </div>
        </div>
      )}
    </Card>
  )
}

export default DragonDetails
