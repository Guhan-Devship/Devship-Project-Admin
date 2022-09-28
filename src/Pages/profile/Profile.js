import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext, UserProvider } from "../../context/UserContext";

import noimage from "../../noimage.png";

function Profile() {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { users, setUserData } = useContext(UserContext);
  console.log(users);
  let completedPercentage = 100;
  if (users.first_name === "") {
    completedPercentage = completedPercentage - 25;
  }
  if (users.surname === "") {
    completedPercentage = completedPercentage - 25;
  }
  if (users.phone === "") {
    completedPercentage = completedPercentage - 25;
  }
  if (users.image === "") {
    completedPercentage = completedPercentage - 25;
  }

  return (
    <>
      <div className="profile-page">
        <div className="card m-3  profile-container">
          <div className="row ">
            <div className="col-4">
              {users.image === "" ? (
                <img src={noimage} alt="profilepic" className="profile-pic" />
              ) : (
                <img
                  src={`http://localhost:2022/${users.image}`}
                  alt="profilepic"
                  className="profile-pic"
                />
              )}
            </div>
            <div className="col-8">
              <div className="m-2">
                <h3>{users.first_name}</h3>
              </div>

              <div class="progress bar-width ">
                <div
                  style={{ width: `${completedPercentage}%` }}
                  class="progress-bar"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex bar-width complition">
                <div>Profile Complition</div>
                <div>{completedPercentage}%</div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row profile-navbar">
            <Link to={"/overview/profile"} style={{ textDecoration: "none" }}>
              <div className="p-2 profile-link">Overview</div>
            </Link>
            <Link to={"/overview/setting"} style={{ textDecoration: "none" }}>
              <div className="p-2 profile-link">Setting</div>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Profile;
