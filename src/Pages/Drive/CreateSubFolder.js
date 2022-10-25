import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import request from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

function CreateSubFolder({ setOpen, params, getSubFolder }) {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [folderName, setFolderName] = useState({
    folder_name: "",
  });
  const handleChange = (e) => {
    setFolderName((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleValidation = () => {
    const { folder_name } = folderName;
    if (folder_name === "") {
      toast.error("Folder name is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log(folderName);
      request({
        url: `createSubFolder/${params.id}`,
        method: "POST",
        data: folderName,
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        if (res.message !== "Folder Created") {
          toast.error(res.message, toastOptions);
        }
        if (res.message === "Folder Created") {
          toast.success("SuccessFully Created", toastOptions);
          setOpen(false);
          getSubFolder();
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
        <span>Create sub-Folder</span>
        <form>
          <div className="row m-3">
            <div className="col-4">Folder Name :</div>
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Folder Name"
                id="folder_name"
                name="folder_name"
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

export default CreateSubFolder;
