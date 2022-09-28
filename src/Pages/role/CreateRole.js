import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import request from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

function CreateRole({ setOpen, getdata }) {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [roleName, setRoleName] = useState({
    role_name: "",
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

  const handleClick = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log(roleName);
      request({
        url: `newRole`,
        method: "POST",
        data: roleName,
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        if (res.message !== "Role Name Created") {
          toast.error(res.message, toastOptions);
        }
        if (res.message === "Role Name Created") {
          toast.success("SuccessFully Created", toastOptions);
          setOpen(false);
          getdata();
        }
      });
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <button
          className="btn btn-sm btn-danger rounded-circle mx-1"
          onClick={() => setOpen(false)}
        >
          X
        </button>
        <span>Create Roll</span>
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
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="rButton" onClick={handleClick}>
            Create
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateRole;
