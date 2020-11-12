import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom"
import './App.css'
import Login from './Login.js'
import Signup from './Signup.js'
import Home from './Home.js'
import Todos from './Todos.js'
import PrivateRoute from './PrivateRoute.js'

export default class App extends Component {
  state = { 
    token: localStorage.getItem('TOKEN') || '',
    username: localStorage.getItem('USERNAME') || ''
  }

  handleTokenAndUsernameChange = (token, username) => {
    localStorage.setItem('TOKEN', token)
    localStorage.setItem('USERNAME', username)
    
    this.setState({ 
      token: token,
      username: username
    })
  }

  logOut = () => {
    localStorage.setItem('TOKEN', '')
    localStorage.setItem('USERNAME', '')

    this.setState({
      token: '',
      username: ''
    })
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            {
            this.state.token 
            ? <div>
              {this.state.username}
              <button onClick={this.logOut}>Log out</button>
            </div>
          : <>
           <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
            </>}
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Home {...routerProps} />} />
            <Route exact path='/login' render={(routerProps) => 
                <Login 
                  {...routerProps} 
                  handleTokenAndUsernameChange={this.handleTokenAndUsernameChange} 
              />
              } 
            />
            <Route 
              exact 
              path='/signup' 
              render={(routerProps) => 
                  <Signup  
                    {...routerProps} 
                    handleTokenAndUsernameChange={this.handleTokenAndUsernameChange} 
                    />
                } 
              />
            <PrivateRoute 
              token={this.state.token} 
              exact 
              path='/todos' 
              render={(routerProps) => <Todos {...routerProps} token={this.state.token} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}