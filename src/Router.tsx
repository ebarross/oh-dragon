import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './login/Login'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dragons" component={() => <div>Dragons</div>} />
        <Route component={() => <div>Página não encontrada.</div>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
