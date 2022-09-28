import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../api/api";
import CreateRole from "./CreateRole";
import { ToastContainer, toast } from "react-toastify";
import EditRole from "./EditRole";

function Role() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditRole, setOpenEditRole] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const [editData, setEditData] = useState([]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleClick = () => {
    setOpenModal(true);
  };

  let getdata = async () => {
    request({
      url: `getRole`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setRoleData(res);
      console.log(res);
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to remove this Cart?"
      );
      if (ask) {
        request({
          url: `deleteRole/${id}`,
          method: "DELETE",
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }).then((res) => {
          toast.success("Removed", toastOptions);
          getdata();
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  const handleEditClick = (id) => {
    try {
      request({
        url: `getRoleby/${id}`,
        method: "GET",
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        setEditData(res);
        setOpenEditRole(true);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Role</h1>
      </div>
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">
            Role List<br></br>
          </h6>
          <p></p>
          <button className="btn btn-primary btn-sm" onClick={handleClick}>
            Create Role
          </button>
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
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roleData.map((list) => {
                  return (
                    <tr>
                      <td>{list.role_name}</td>
                      <td>
                        <button
                          class="btn btn-outline-danger btn-sm ms-2"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="delete"
                          onClick={() => handleDelete(list._id)}
                        >
                          Remove
                        </button>
                        <button
                          className="btn btn-outline-warning btn-sm ms-2"
                          onClick={() => handleEditClick(list._id)}
                        >
                          Edit
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
      {openModal && <CreateRole setOpen={setOpenModal} getdata={getdata} />}
      {openEditRole && (
        <EditRole
          setOpenEditRole={setOpenEditRole}
          editData={editData}
          getdata={getdata}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default Role;
