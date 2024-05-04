import { useState } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import classes from './Layout.module.scss'
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../topbar/Topbar'
import { AuthService } from '../../services/auth/auth-service'
import DragonDetails from '../../features/dragon/dragon-details/DragonDetails'
import DragonList from '../../features/dragon/dragon-list/DragonList'
import DragonForm from '../../features/dragon/dragon-form/DragonForm'

function isMobile() {
  return window.matchMedia('(max-width: 767px)').matches
}

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isMobile() ? false : true)

  if (!AuthService.isUserLogged()) {
    return <Redirect to="/login" />
  }

  return (
    <div className={classes.container}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className={classes.rightContent}>
        <Topbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className={classes.main}>
          <Switch>
            <Route exact path="/dragons" component={DragonList} />
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
