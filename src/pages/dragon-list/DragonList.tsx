import { useHistory } from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import classes from './DragonList.module.scss'
import { DragonService } from '../../services/dragon/dragon-service'
import useDragons from '../../hooks/useDragons'
import { Dragon } from '../../interfaces/dragon'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'
import IconButton from '../../components/icon-button/IconButton'

function DragonList() {
  const { data: dragons, loading, error, fetch } = useDragons()
  const history = useHistory()

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
      ) : loading || !dragons ? (
        <div>Carregando dragões...</div>
      ) : dragons.length === 0 ? (
        <div>Não há dragões cadastrados.</div>
      ) : (
        <div className={classes.container}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dragons.map((dragon) => (
                <tr key={dragon.id}>
                  <td>{dragon.id}</td>
                  <td>{dragon.name}</td>
                  <td>{dragon.type}</td>
                  <td className={classes.actions}>
                    <IconButton
                      variant="primary"
                      label="Ver detalhes"
                      onClick={() =>
                        history.push(`/dragons/details/${dragon.id}`)
                      }
                    >
                      <FaRegEye size={18} />
                    </IconButton>
                    <IconButton
                      variant="secondary"
                      label="Editar"
                      onClick={() => history.push(`/dragons/edit/${dragon.id}`)}
                    >
                      <FaPen size={18} />
                    </IconButton>
                    <IconButton
                      variant="danger"
                      label="Remover"
                      onClick={() => removeDragon(dragon.id)}
                    >
                      <FaRegTrashCan size={18} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}

export default DragonList
