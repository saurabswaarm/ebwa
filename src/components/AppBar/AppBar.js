import { Link } from "react-router-dom";

function AppBar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          EBWA
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Log Out
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth/changepassword">
                Change Password
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default AppBar;