import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import request from "../../api/api";
import Navbar from "../../Component/Navbar";
import { ToastContainer, toast } from "react-toastify";

function ViewUser() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
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

  let handleMove = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to Move this User to form?"
      );
      if (ask) {
        request({
          url: `moveUser/${id}`,
          method: "POST",
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }).then((res) => {
          toast.success(res.message, toastOptions);
          navigate("/users");
        });
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <div class="card w-50">
        <div class="card-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 class="card-title">Users Details</h3>
                <div className="d-flex flex-row-reverse">
                  <button
                    className="btn-danger btn"
                    onClick={() => handleMove(params.id)}
                  >
                    Revert
                  </button>
                </div>
                <p class="card-text">
                  Name:<strong>{user.first_name}</strong>
                </p>
                <p class="card-text">
                  Surname:<strong>{user.surname}</strong>
                </p>
                <p class="card-text">
                  Email:<strong>{user.email}</strong>
                </p>
                <p>gender:{user.gender}</p>
                <p>phone:{user?.phone?.number}</p>
                <p>role:{user.role}</p>
                <p>
                  skill:
                  <ul>
                    {user?.skill?.map((e) => {
                      return <li>{e.value}</li>;
                    })}
                  </ul>
                </p>
                <div className="col-lg-6 mt-3">
                  <input
                    type={"submit"}
                    value="Close"
                    onClick={() => navigate("/users", { replace: true })}
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ViewUser;
