import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'Styles/style.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import RouteSlug from './routes/'

class App extends Component {
  renderRoutes() {
    return RouteSlug.map((route, i) => {
      return (
        <Route
          key={i}
          exact={route.path === '/'}
          path={route.path}
          component={route.component}
        />
      )
    })
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>{this.renderRoutes()}</Switch>
        </BrowserRouter>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
