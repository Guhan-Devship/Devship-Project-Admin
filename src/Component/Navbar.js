import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  let navigate = useNavigate();
  let handleLogout = () => {
    window.localStorage.removeItem("myapptoken", "id", "role");
    navigate("/");
    window.location.reload();
  };
  const { users, setUserData } = useContext(UserContext);

  return (
    <>
      <nav id="navbar-example2" class="navbar navbar-light topbar">
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
              {users.name}
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item">{users.name}</a>
              <a class="dropdown-item">{users.email}</a>
              <Link to={"/profile"}>
                <button className="btn btn-primary btn-sm mt-2 ms-2">
                  Edit
                </button>
              </Link>
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
