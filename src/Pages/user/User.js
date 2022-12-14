import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import request from "../../api/api";
import Navbar from "../../Component/Navbar";
import { UserContext } from "../../context/UserContext";

function User() {
  const { users } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  async function fetchAll() {
    try {
      let listData = await axios.get("http://localhost:2022/all/user", {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
      setUserData(listData.data);
      console.log(listData.data);
    } catch (error) {
      toast.error("Something went wrong", toastOptions);
    }
  }
  useEffect(() => {
    fetchAll();
    fetchData();
  }, []);
  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this User?"
      );
      if (ask) {
        await axios.delete(`http://localhost:2022/deleteUser/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        });
        toast.success("Removed", toastOptions);
        fetchAll();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleLoginAsClient = async (id, e) => {
    e.preventDefault();

    request({
      url: `request-client-login/${id}`,
      method: "POST",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      if (res.status === 0) {
        toast.error(res.message);
      }

      if (res.status === 1) {
        const { uuid } = res.response;
        window.open(`http://localhost:3000/login/client/${uuid}`, "_blank");
      }
    });
  };
  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Users</h1>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Users Details</h6>
          <Link to={"createnew"}>
            <button className="btn btn-primary btn-sm">Create User</button>
          </Link>
        </div>
        <div class="card-body">
          <div class="table-responsive table-scroll">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surnmae</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => {
                  return (
                    <tr>
                      <td>{user.first_name}</td>
                      <td>{user.surname}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        {users.userDelete === true ? (
                          <button
                            class="btn btn-outline-danger btn-sm ms-2"
                            onClick={() => handleDelete(user._id)}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="delete"
                          >
                            Remove
                          </button>
                        ) : (
                          ""
                        )}
                        {users.userEdit === true ? (
                          <Link to={`edit-user/${user._id}`}>
                            <button
                              className="btn btn-outline-warning btn-sm ms-2"
                              disabled={users.userEdit !== true}
                            >
                              Edit
                            </button>
                          </Link>
                        ) : (
                          ""
                        )}
                        {users.userView === true ? (
                          <Link to={`view-user/${user._id}`}>
                            <button
                              className="btn btn-outline-primary btn-sm ms-2"
                              disabled={users.userView !== true}
                            >
                              View
                            </button>
                          </Link>
                        ) : (
                          ""
                        )}
                        {users.role === "admin" ? (
                          <button
                            className="btn btn-outline-success btn-sm ms-2"
                            onClick={(e) => handleLoginAsClient(user._id, e)}
                          >
                            Login as
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default User;
