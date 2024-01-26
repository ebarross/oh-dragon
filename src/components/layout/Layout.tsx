import { Switch, Route, Link } from 'react-router-dom'
import { FaDragon } from 'react-icons/fa'
import classes from './Layout.module.scss'
import Dragons from '../dragons/Dragons'

function Layout() {
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
        <div className={classes.topBar}></div>

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
