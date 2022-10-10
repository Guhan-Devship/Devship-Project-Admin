import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../../api/api";
import { UserContext } from "../../../context/UserContext";
import CreateSubadmin from "./CreateSubadmin";
import { ToastContainer, toast } from "react-toastify";
import EditSubadmin from "./EditSubadmin";
import ViewSubadmin from "./ViewSubadmin";

function Subadmins() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { users } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [userData, setUserData] = useState([]);
  const handleClick = () => {
    setOpenModal(true);
  };
  const handleEditClick = (id) => {
    try {
      request({
        url: `getsubadmin/${id}`,
        method: "GET",
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        console.log(res);
        setEditData(res);
        setOpenEditModal(true);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewClick = (id) => {
    try {
      request({
        url: `getsubadmin/${id}`,
        method: "GET",
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        console.log(res);
        setViewData(res);
        setOpenViewModal(true);
      });
    } catch (error) {
      console.log(error);
    }
  };
  async function fetchAll() {
    try {
      request({
        url: `getallSuadmins`,
        method: "GET",
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        console.log(res);
        setUserData(res);
      });
    } catch (error) {
      toast.error("Something went wrong", toastOptions);
    }
  }
  useEffect(() => {
    fetchAll();
  }, []);
  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this User?"
      );
      if (ask) {
        request({
          url: `deleteSubadmin/${id}`,
          method: "DELETE",
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }).then((res) => {
          toast.success(res.message, toastOptions);
          fetchAll();
        });
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <div className="card m-3">
        <div className="row">
          <div className="col">
            <h6 className="overview-heading m-3">Subadmins List </h6>
          </div>
          <div className="m-3 col update-btn ">
            <button className="btn-primary btn btn-sm" onClick={handleClick}>
              Create Subadmin
            </button>
          </div>
        </div>
        <hr class="sidebar-divider" />
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
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => {
                  return (
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          class="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => handleDelete(user._id)}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="delete"
                        >
                          Remove
                        </button>
                        <button
                          className="btn btn-outline-warning btn-sm ms-2"
                          onClick={() => handleEditClick(user._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-primary btn-sm ms-2"
                          onClick={() => handleViewClick(user._id)}
                        >
                          View
                        </button>
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
      {openModal && <CreateSubadmin setOpen={setOpenModal} />}
      {openEditModal && (
        <EditSubadmin setOpenEditModal={setOpenEditModal} editData={editData} />
      )}
      {openViewModal && (
        <ViewSubadmin setOpenViewModal={setOpenViewModal} viewData={viewData} />
      )}
    </>
  );
}

export default Subadmins;
