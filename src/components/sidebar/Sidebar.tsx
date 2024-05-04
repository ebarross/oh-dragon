import { Link, useLocation } from 'react-router-dom'
import { FaDragon } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { CgClose } from 'react-icons/cg'
import classes from './Sidebar.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({ isOpen, onClose }: Props) {
  const { pathname } = useLocation()

  return (
    <div className={`${classes.sideBar} ${isOpen && classes.open}`}>
      <button
        className={classes.closeButton}
        aria-label="Fechar menu lateral"
        onClick={onClose}
      >
        <CgClose size={24} />
      </button>
      <div className={classes.sideBarContent}>
        <ul className={classes.sideBarList}>
          <li className={pathname === '/' ? classes.sideBarLinkActive : ''}>
            <Link to="/">
              <FaHouse size={28} color="#fdc323" /> Home
            </Link>
          </li>
          <li
            className={pathname === '/dragons' ? classes.sideBarLinkActive : ''}
          >
            <Link to="/dragons">
              <FaDragon size={28} color="#fdc323" /> Dragões
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
