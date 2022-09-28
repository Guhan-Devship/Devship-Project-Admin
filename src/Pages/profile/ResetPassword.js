import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function ResetPassword() {
  const { users, setUserData } = useContext(UserContext);
  return (
    <div className="card m-3">
      <div className="row">
        <div className="col">
          <h6 className="overview-heading m-3">Reset Password</h6>
        </div>
        <div className="m-3 col update-btn">
          <button className="btn-primary btn btn-sm">update</button>
        </div>
      </div>
      <hr class="sidebar-divider" />
      <div className="row m-3">
        <div className="col-4">email</div>
        <div className="col-8">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            id="reset-email"
            name="email"
            value={users.email}
          />
        </div>
      </div>
      <div className="row m-3">
        <div className="col-4">Password</div>
        <div className="col-8">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            id="password"
            name="password"
            value={users.password}
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
