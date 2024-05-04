import { useHistory } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { RxHamburgerMenu } from 'react-icons/rx'
import classes from './Topbar.module.scss'
import { AuthService } from '../../services/auth/auth-service'

type Props = {
  onToggleSidebar: () => void
}

function Topbar({ onToggleSidebar }: Props) {
  const history = useHistory()

  const handleLogout = () => {
    AuthService.logout()
    history.push('/login')
  }

  return (
    <div className={classes.topBar}>
      <div className={classes.hamburgerMenu}>
        <button
          aria-label="Abrir ou fechar menu lateral"
          onClick={onToggleSidebar}
        >
          <RxHamburgerMenu size={24} />
        </button>
      </div>
      <button className={classes.logoutButton} onClick={handleLogout}>
        <HiOutlineLogout size={24} />
        <span>Sair</span>
      </button>
    </div>
  )
}

export default Topbar
