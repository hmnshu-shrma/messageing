import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'Styles/style.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import RouteSlug from './routes/'
import { webSocketHandler } from './utils/websocket'
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
    webSocketHandler()
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
