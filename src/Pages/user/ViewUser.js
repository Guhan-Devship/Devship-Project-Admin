import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Navbar from "../../Component/Navbar";

function ViewUser() {
  const users = useContext(UserContext);
  console.log(users);
  function fetch() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUserData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let user = await axios.get(`http://localhost:2022/getUser/${params.id}`, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
      setUserData(user.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <div class="card w-50">
        <div class="card-body">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <h3 class="card-title">Users Details</h3>
                <p class="card-text">
                  Name:<strong>{user.first_name}</strong>
                </p>
                <p class="card-text">
                  Surname:<strong>{user.surname}</strong>
                </p>
                <p class="card-text">
                  Email:<strong>{user.email}</strong>
                </p>
                <div className="col-lg-6 mt-3">
                  <input
                    type={"submit"}
                    value="Close"
                    onClick={() => navigate("/home/users", { replace: true })}
                    className="btn btn-primary"
                  />
                </div>
                <p className="mt-3">Created by {users}</p>
              </div>
              <div className="col-6"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUser;
