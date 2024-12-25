import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-container">
        <ul className="link-list-container">
          <li className="link-list-item">
            <Link className="nav-link" to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="header-website-logo"
              />
            </Link>
          </li>
          <li className="link-list-item">
            <Link className="nav-link" to="/">
              Home
            </Link>

            <Link className="nav-link" to="/jobs">
              Jobs
            </Link>
          </li>

          <li className="link-list-item">
            <button
              className="header-logout-button"
              type="button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Header)
