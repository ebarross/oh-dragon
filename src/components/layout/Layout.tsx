import { Redirect, Switch, Route, Link, useHistory } from 'react-router-dom'
import { FaDragon } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import classes from './Layout.module.scss'
import Dragons from '../dragons/Dragons'

function Layout() {
  const history = useHistory()
  const token = localStorage.getItem('token')

  if (!token) {
    return <Redirect to="/login" />
  }

  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <div className={classes.sideBarContent}>
          <ul className={classes.sideBarList}>
            <li>
              <Link to="/dragons">
                <FaDragon size={28} color="#fdc323" /> Dragões
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.rightContent}>
        <div className={classes.topBar}>
          <div></div>
          <button
            className={classes.logoutButton}
            onClick={() => {
              localStorage.setItem('token', '')
              history.push('/login')
            }}
          >
            <HiOutlineLogout size={28} />
            <span>Sair</span>
          </button>
        </div>

        <main className={classes.main}>
          <Switch>
            <Route exact path="" component={Dragons} />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default Layout
