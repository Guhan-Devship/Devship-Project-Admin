import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [userData, setUserData] = useState([]);
  let navigate = useNavigate();
  let handleLogout = () => {
    window.localStorage.removeItem("myapptoken", "name");
    navigate("/");
    window.location.reload();
  };
  let userId = window.localStorage.getItem("id");
  async function fetchData() {
    let user = await axios.get(`http://localhost:2022/getUser/${userId}`, {
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    });
    console.log(user.data);
    setUserData(user.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  let mobile = window.localStorage.getItem("mobile");
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
              {userData.first_name}
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item">{userData.first_name}</a>
              <a class="dropdown-item">{userData.phone}</a>
              <a class="dropdown-item">{userData.email}</a>
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
