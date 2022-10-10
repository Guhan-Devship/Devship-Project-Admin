import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import request from "../api/api";
import { identity } from "lodash";

function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, email } = value;
      request({
        url: `admin/login`,
        method: "POST",
        data: value,
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        console.log(res);
        if (res.status === 0) {
          toast.error(res.response, toastOptions);
        } else if (res.status === 1) {
          toast.success(res.response.message, toastOptions);
          window.localStorage.setItem("myapptoken", res.response.authToken);
          window.localStorage.setItem("id", res.response.userId);
          window.localStorage.setItem("role", res.response.role);
          navigate("/dashboard");
          window.location.reload();
        }
      });
    }
  };
  const handleValidation = () => {
    const { password, email } = value;
    if (password === "") {
      toast.error("Email and Password is required", toastOptions);
      return false;
    } else if (email.length === "") {
      toast.error("Email and Password is required", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="phone-container">
        <h1 className="mb-3">Admin Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="form-group mb-2">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
              min="3"
            />
          </div>
          <div class="form-group mb-2">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input
            type="submit"
            class="form-control btn btn-primary btn-sm mb-3"
            value={"Login"}
          />
        </form>
        <p>
          By entering your data, you're agreeing to our{" "}
          <span>Terms of Service and Privacy Policy</span>.Thanks!
        </p>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
