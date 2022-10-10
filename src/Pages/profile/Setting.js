import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import ResetPassword from "./ResetPassword";
import { ToastContainer, toast } from "react-toastify";
import noimage from "../../noimage.png";
import request from "../../api/api";
import { useObjectUrl } from "../../useObjectUrl";
import axios from "axios";
function Setting() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { users, setUserData } = useContext(UserContext);
  const {
    objectURL: imagePreviewUrl,
    setObject: setImage,
    object: image,
  } = useObjectUrl();
  const [values, setValue] = useState({
    name: users.name,
    last_name: users.last_name,
    email: users.email,
    image: null,
  });
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log(values);
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;

    if (!file || !file.type.startsWith("image/")) {
      alert("Invalid file format");
      return;
    }

    setValue({ ...values, image: file });
    setImage(file);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(values);

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, value)
    );
    {
      users.role === "admin"
        ? request({
            url: `updateadmin/${users._id}`,
            method: "PUT",
            data: formData,
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }).then((res) => {
            console.log(res);
            if (res.message !== "Updated") {
              toast.error(res.message, toastOptions);
            }
            if (res.message === "Updated") {
              toast.success(res.message, toastOptions);
            }
          })
        : request({
            url: `updatesubadmin/${users._id}`,
            method: "PUT",
            data: formData,
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }).then((res) => {
            if (res.message !== "Updated") {
              toast.error(res.message, toastOptions);
            }
            if (res.message === "Updated") {
              toast.success(res.message, toastOptions);
            }
          });
    }
  };

  let handleDelete = async (image, e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:2022/removeImage/${users._id}`,
        image,
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      toast.success("Removed", toastOptions);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="card m-3">
        <div className="row">
          <div className="col">
            <h6 className="overview-heading m-3">Setting</h6>
          </div>
          <div className="m-3 col update-btn ">
            <button className="btn-primary btn btn-sm" onClick={handleClick}>
              update
            </button>
          </div>
        </div>

        <hr class="sidebar-divider" />
        <form>
          <div className="row m-3">
            <div className="col-4">Profile Pic</div>
            <div className="col-8">
              <div className="img-modify">
                <button className="edit-btn rounded-pill">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="img"
                    id="image"
                    name="image"
                    accept=".jpg,.png,.jpeg"
                    onChange={handleFileChange}
                  />
                </button>
                {values.image === null ? (
                  users.image === "" ? (
                    <img
                      src={noimage}
                      alt="upload image"
                      className="profile-pic"
                    />
                  ) : (
                    <img
                      src={`http://localhost:2022/${users.image}`}
                      className="profile-pic"
                      alt="profilepic"
                    />
                  )
                ) : values.image !== null ? (
                  <img src={imagePreviewUrl} className="profile-pic" />
                ) : (
                  <img
                    src={noimage}
                    alt="upload image"
                    className="profile-pic"
                  />
                )}
                {/* {user.user.image === "" ? (
                  <img
                    src={noimage}
                    alt="upload image"
                    className="profile-pic"
                  />
                ) : values.image === null ? (
                  <img
                    src={`http://localhost:2022/${user.user.image}`}
                    className="profile-pic"
                    alt="profilepic"
                  />
                ) : (
                  <img src={imagePreviewUrl} className="profile-pic" />
                )} */}
                {users.image !== "" ? (
                  <button
                    className="remove-btn rounded-pill"
                    onClick={(e) => handleDelete(users.image, e)}
                  >
                    X
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="row m-3">
            <div className="col-4">Name</div>
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="username"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row m-3">
            <div className="col-4">Surname</div>
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="lastname"
                id="last_name"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row m-3">
            <div className="col-4">Email</div>
            <div className="col-8">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className="row m-3">
            <div className="col-4">Phone</div>
            <div className="col-8">
              <input
                type="number"
                className="form-control"
                placeholder="Phone"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
            </div>
          </div> */}
          <div className="row m-3">
            <div className="col-4">Active</div>
            <div className="col-8">
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
      <ResetPassword />
    </>
  );
}

export default Setting;
