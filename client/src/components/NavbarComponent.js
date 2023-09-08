import { Link, withRouter } from 'react-router-dom';
import { getUser, logout } from '../services/authorize';

const NavbarComponent = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          หน้าแรก
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            {!getUser() && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  เข้าสู่ระบบ
                </Link>
              </li>
            )}
            {getUser() && (
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  เขียนบทความ
                </Link>
              </li>
            )}
            {getUser() && (
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => logout(() => history.push('/'))}
                >
                  ออกจากระบบ
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(NavbarComponent);
