import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  let handleLogout = () => {
    window.localStorage.removeItem("myapptoken", "name");
    navigate("/");
  };

  let user = window.localStorage.getItem("name");
  let mobile = window.localStorage.getItem("mobile");
  return (
    <>
      <nav id="navbar-example2" class="navbar navbar-light bg-dark">
        <Link to={"/home"} class="navbar-brand text-white">
          Admin Page
        </Link>
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-user" aria-hidden="true"></i>
              Info
            </a>
            <div class="dropdown-menu">
              <Link to={"/users"} class="dropdown-item">
                User
              </Link>
              <Link to={"/product"} class="dropdown-item">
                Product
              </Link>
              <Link to={"/order"} class="dropdown-item">
                Orders
              </Link>
              <div role="separator" class="dropdown-divider"></div>
            </div>
          </li>
        </ul>
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-user" aria-hidden="true"></i>
              {user}
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item">{user}</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item text-danger" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
