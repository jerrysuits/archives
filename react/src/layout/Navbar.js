import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { current_user, logout } = useContext(AuthContext);
  console.log("CURRENT USER IN NAVBAR ", current_user);

  // Check if the user is logged in
  const isLoggedIn = current_user !== null;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark text-light mt-0 text-white">
        <div className="container ">
          <a className="navbar-brand fw-bold fs-1 fw-bold text-light" href="#">
            The Archive
          </a>
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
          <div className="collapse navbar-collapse hamburger-box" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active fs-2 text-light" aria-current="page">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/guide" className="nav-link active fs-2 text-light">
                  Guide
                </Link>
              </li>

              {/* Check if the user is not logged in */}
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link active fs-2 text-light">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link active fs-2 text-light">
                      Sign up
                    </Link>
                  </li>
                </>
              )}

              {/* Check if the user is logged in */}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/post" className="nav-link active fs-2 text-light">
                      Post
                    </Link>
                  </li>

                  <div className="dropdown pb-4">
                    <a
                      href="#"
                      className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                      id="dropdownUser1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.jixXH_Els1MXBRmKFdMQPAHaHa%26pid%3DApi%26h%3D160&f=1&ipt=20de2779e34d6c09e71f15922eec040d7efe8f0601b6356de606b2e775f897f8&ipo=images"
                        alt="hugenerd"
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                      <span className="d-none d-sm-inline mx-1">user</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                      <li>
                      <a className="dropdown-item">
                          Profile
                        </a>
                        <a className="dropdown-item text-light" onClick={() => logout()}>
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}


