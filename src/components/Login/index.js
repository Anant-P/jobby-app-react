import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    errMessage: '',
    showErrPara: false,
  }

  onFormSubmit = event => {
    event.preventDefault()
    this.userLogin()
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChage = event => {
    this.setState({password: event.target.value})
  }

  userAuthSuccess = jwtToken => {
    this.setState({showErrPara: false})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  userAuthFailure = errorMsg => {
    this.setState({errMessage: errorMsg, showErrPara: true})
  }

  userLogin = async () => {
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.userAuthSuccess(data.jwt_token)
    } else {
      this.userAuthFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errMessage, showErrPara} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-card">
          <div className="logo-container">
            <img
              className="logo-img"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <form onSubmit={this.onFormSubmit} className="login-form">
            <label className="label-ele" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              className="input-ele"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.onUsernameChange}
            />
            <label className="label-ele" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              className="input-ele"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onPasswordChage}
            />
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
          {showErrPara ? <p className="error-msg">{errMessage}</p> : null}
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
