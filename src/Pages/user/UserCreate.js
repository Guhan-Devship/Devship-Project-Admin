import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../Component/Navbar";

function UserCreate() {
  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [credentials, setCredentials] = useState({
    first_name: undefined,
    surname: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, first_name, surname, email, confirmPassword } =
        credentials;
      const data = await axios.post(
        "http://localhost:2022/register",
        {
          first_name,
          surname,
          email,
          password,
          confirmPassword,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      if (data.data.message === "Email already exists") {
        toast.error(data.data.message, toastOptions);
      }
      if (data.data.message === "Password not match") {
        toast.error(data.data.message, toastOptions);
      }
      if (data.data.message === "User Created") {
        toast.success("SuccessFully Created", toastOptions);
        navigate("/home/users");
      }
    }
  };
  const handleValidation = () => {
    const { password, first_name, surname, email, confirmPassword } =
      credentials;
    if (first_name.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (surname.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <div className="container mx-auto mt-5">
        <div class="card-header py-3 mb-2 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Users Details</h6>
        </div>
        <div className="card-body">
          <form>
            <div className="row user-row">
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  id="first_name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Surname"
                  id="surname"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-4 mt-5 ms-2">
              <Link to={"/home/users"}>
                <button className="btn btn-danger btn-sm me-2">cancel</button>
              </Link>
              <button className="btn btn-primary btn-sm" onClick={handleClick}>
                Create
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default UserCreate;
