import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/login/Login'
import Layout from './layout/private-layout/PrivateLayout'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/dragons" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/dragons" component={Layout} />
        <Route component={() => <div>Página não encontrada.</div>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
