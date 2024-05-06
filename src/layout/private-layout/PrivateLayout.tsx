import { useState } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import classes from './PrivateLayout.module.scss'
import { AuthService } from '../../services/auth/auth-service'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import DragonList from '../../pages/dragon-list/DragonList'
import DragonForm from '../../pages/dragon-form/DragonForm'
import DragonDetails from '../../pages/dragon-details/DragonDetails'

function isMobile() {
  return window.matchMedia('(max-width: 767px)').matches
}

function PrivateLayout() {
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

export default PrivateLayout
