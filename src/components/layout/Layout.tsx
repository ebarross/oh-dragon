import { useState } from 'react'
import {
  Redirect,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { FaDragon } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import { FaHouse } from 'react-icons/fa6'
import { RxHamburgerMenu } from 'react-icons/rx'
import { CgClose } from 'react-icons/cg'
import DragonDetails from '../dragon-details/DragonDetails'
import classes from './Layout.module.scss'
import Dragons from '../dragons/Dragons'
import DragonForm from '../dragon-form/DragonForm'
import AuthService from '../../services/auth-service'

function isMobile() {
  return window.matchMedia('(max-width: 767px)').matches
}

function Layout() {
  const history = useHistory()
  const { pathname } = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(isMobile() ? false : true)

  if (!AuthService.isUserLogged()) {
    return <Redirect to="/login" />
  }

  return (
    <div className={classes.container}>
      <div className={`${classes.sideBar} ${sidebarOpen && classes.open}`}>
        <button
          className={classes.closeButton}
          aria-label="Abrir ou fechar menu lateral"
          onClick={() => setSidebarOpen(false)}
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
              className={
                pathname === '/dragons' ? classes.sideBarLinkActive : ''
              }
            >
              <Link to="/dragons">
                <FaDragon size={28} color="#fdc323" /> Dragões
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.rightContent}>
        <div className={classes.topBar}>
          <div className={classes.hamburgerMenu}>
            <button
              aria-label="Abrir menu lateral"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <RxHamburgerMenu size={24} />
            </button>
          </div>
          <button
            className={classes.logoutButton}
            onClick={() => {
              localStorage.setItem('token', '')
              history.push('/login')
            }}
          >
            <HiOutlineLogout size={24} />
            <span>Sair</span>
          </button>
        </div>

        <main className={classes.main}>
          <Switch>
            <Route exact path="/dragons" component={Dragons} />
            <Route path="/dragons/new" component={DragonForm} />
            <Route path="/dragons/edit/:dragonId" component={DragonForm} />
            <Route
              path="/dragons/details/:dragonId"
              component={DragonDetails}
            />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default Layout
