import { FaRegEye } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import classes from './DragonList.module.scss'

export type Dragon = {
  id: string
  name: string
  type: string
  histories: string
  createdAt: string
}

type Props = {
  list: Dragon[]
}

function DragonList({ list }: Props) {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Histórias</th>
          <th>Data de criação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list.map((dragon) => (
          <tr key={dragon.id}>
            <td>{dragon.id}</td>
            <td>{dragon.name}</td>
            <td>{dragon.type}</td>
            <td>{dragon.histories}</td>
            <td>{dragon.createdAt}</td>
            <td>
              <button
                aria-label="Ver detalhes"
                className={classes.button}
                onClick={() => {}}
              >
                <FaRegEye size={18} />
              </button>
              <button
                aria-label="Editar"
                className={classes.button}
                onClick={() => {}}
              >
                <FaPen size={18} />
              </button>
              <button
                aria-label="Remover"
                className={classes.button}
                onClick={() => {}}
              >
                <FaRegTrashCan size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DragonList
