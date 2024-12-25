import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {usernameInput: '', passwordInput: '', isFailed: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({isFailed: true, errorMsg})
  }

  onLogin = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {usernameInput, passwordInput, isFailed, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-form-card">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <form className="form-el">
            <label className="label-el" htmlFor="usernameInput">
              USERNAME
            </label>
            <input
              type="text"
              id="usernameInput"
              className="input-el"
              placeholder="Username"
              value={usernameInput}
              onChange={this.onChangeUsername}
            />
            <label className="label-el" htmlFor="passwordInput">
              PASSWORD
            </label>
            <input
              type="password"
              id="passwordInput"
              className="input-el"
              placeholder="Password"
              value={passwordInput}
              onChange={this.onChangePassword}
            />
            <button
              className="login-button-el"
              type="submit"
              onClick={this.onLogin}
            >
              Login
            </button>
            {isFailed && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
