import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import noimage from "../../noimage.png";
import ResetPassword from "./ResetPassword";

function OverView() {
  const { users, setUserData } = useContext(UserContext);
  console.log(users);

  return (
    <>
      <div className="card m-3">
        <h6 className="overview-heading m-3">Profile Details</h6>
        <hr class="sidebar-divider" />
        <form>
          <div className="row m-3">
            <div className="col-4">
              <div>Avatar</div>
            </div>
            <div className="col-8">
              <div className="img-modify">
                {/* <button className="edit-btn rounded-pill">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button> */}
                {users.image === "" ? (
                  <img src={noimage} alt="" className="profile-pic" />
                ) : (
                  <img
                    src={`http://localhost:2022/${users.image}`}
                    className="profile-pic"
                    alt="profilepic"
                  />
                )}
                {/* <button className="remove-btn rounded-pill">X</button> */}
              </div>
            </div>
          </div>
          <div className="row m-3">
            <div className="col-4">
              <div>Full Name</div>
            </div>
            <div className="col-8">
              <h5>
                {users.name} {users.last_name}
              </h5>
            </div>
          </div>
          <div className="row m-3">
            <div className="col-4">
              <div>Email</div>
            </div>
            <div className="col-8">
              <h5>{users.email}</h5>
            </div>
          </div>
          <div className="row m-3">
            <div className="col-4">
              <div>Phone</div>
            </div>
            <div className="col-8">
              <h5>{users?.phone?.number}</h5>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default OverView;
