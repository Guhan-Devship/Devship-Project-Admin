import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import request from "../../api/api";
function EditRole({ setOpenEditRole, editData, getdata }) {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [roleName, setRoleName] = useState({
    role_name: editData.role_name,
  });
  const handleChange = (e) => {
    setRoleName((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleValidation = () => {
    const { role_name } = roleName;
    if (role_name === "") {
      toast.error("Role name is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleClick = (id, e) => {
    e.preventDefault();
    console.log(id);
    try {
      request({
        url: `updateRole/${id}`,
        method: "PUT",
        data: roleName,
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        toast.success(res.message, toastOptions);
        setOpenEditRole(false);
        getdata();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <button
          className="btn btn-sm btn-danger rounded-circle mx-1"
          onClick={() => setOpenEditRole(false)}
        >
          X
        </button>
        <span>Edit Role Name</span>
        <form>
          <div className="row m-3">
            <div className="col-4">Role Name :</div>
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Role Name"
                id="role_name"
                name="role_name"
                value={roleName.role_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="rButton"
            onClick={(e) => handleClick(editData._id, e)}
          >
            Update
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditRole;
