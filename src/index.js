import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'Styles/style.scss'
import { Router, Route, Switch } from 'react-router-dom'
import RouteSlug from './routes/'
// import { webSocketHandler } from './utils/websocket'
// import { Provider } from 'react-redux'
// import store from './store'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import axios from 'axios'
import history from './utils/history'
import Header from './views/header'
// import OrderConfirmationContainer from './orderConfirmation'

const client = new W3CWebSocket('ws://localhost:3030/ws', 'optionalProtocol')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { connected: false, messageData: '' }
    client.onopen = () => {
      console.log('WebSocket Client Connected')
      this.setState({ connected: true })
    }
    client.onmessage = message => {
      const data = JSON.parse(message.data)
      console.log(data, 'data')
      console.log(message, 'message')
      console.log(this.props, 'main props')
      localStorage.setItem('pageErrorSuccess', data.serviceStatus)
      localStorage.setItem('messageData', JSON.stringify(message.data))
      this.setState({ messageData: data })

      if (data && data.pageName) {
        window.location = `/${data.pageName}`
      }
    }

    this.state.messageData ? console.log('no call') : this.callIpAddress()
  }

  callIpAddress = () => {
    axios.get('https://api.ipify.org?format=json').then(res => {
      const ipData = res.data
      this.state.connected
        ? setTimeout(() => this.submitInitMessage(ipData), 1000)
        : this.setState({ connected: false })
    })
  }

  submitInitMessage = data => {
    const { ip } = data
    const initData = { user: 'client', msgType: 'IDENTIFICATION', ip }
    client.send(JSON.stringify(initData))
  }

  renderRoutes() {
    const { messageData } = this.state

    return RouteSlug.map(({ component: Dashboard, ...route }, i) => {
      return (
        <Route
          key={i}
          exact={route.path === '/'}
          path={route.path}
          render={props => <Dashboard {...props} data={messageData} />}
        />
      )
    })
  }

  render() {
    return (
      <>
        <Header />
        <Router history={history}>
          <Switch>{this.renderRoutes()}</Switch>
        </Router>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
