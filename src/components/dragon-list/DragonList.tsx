import { useHistory } from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import classes from './DragonList.module.scss'
import Card from '../card/Card'
import useDragons from '../../hooks/useDragons'
import DragonService from '../../services/dragon-service'
import Button from '../button/Button'
import { Dragon } from '../../types/dragon'

function DragonList() {
  const { data, loading, error, fetch } = useDragons()
  const history = useHistory()

  const dragons = data?.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
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
                    <button
                      title="Ver detalhes"
                      aria-label="Ver detalhes"
                      className={classes.button}
                      onClick={() =>
                        history.push(`/dragons/details/${dragon.id}`)
                      }
                    >
                      <FaRegEye size={18} />
                    </button>
                    <button
                      title="Editar"
                      aria-label="Editar"
                      className={classes.button}
                      onClick={() => history.push(`/dragons/edit/${dragon.id}`)}
                    >
                      <FaPen size={18} />
                    </button>
                    <button
                      title="Remover"
                      aria-label="Remover"
                      className={classes.button}
                      onClick={() => removeDragon(dragon.id)}
                    >
                      <FaRegTrashCan size={18} />
                    </button>
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
