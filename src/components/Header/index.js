import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const removeCookies = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header">
      <ul className="header-container">
        <li>
          <Link className="nav-link" to="/">
            <img
              className="logo-img"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>
        <li>
          <ul className="nav-ele-box-container">
            <Link className="nav-link" to="/">
              <li>Home</li>
            </Link>

            <Link className="nav-link" to="/jobs">
              <li>Jobs</li>
            </Link>
          </ul>
        </li>
        <li>
          <Link to="/login">
            <li>
              <button
                type="button"
                className="logout-btn"
                onClick={removeCookies}
              >
                Logout
              </button>
            </li>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
