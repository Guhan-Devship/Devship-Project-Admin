import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../Component/Navbar";

function EditUser() {
  function fetch() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  let params = useParams();
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
    isAdmin: undefined,
  });
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  useEffect(() => {
    async function fetchData() {
      try {
        let editdata = await axios.get(
          `http://localhost:2022/getUser/${params.id}`,
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );
        setCredentials({
          first_name: editdata.data.first_name,
          surname: editdata.data.surname,
          email: editdata.data.email,
          isAdmin: editdata.data.isAdmin,
        });
        console.log(editdata);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    fetch();
  }, []);
  const handleUpdate = async () => {
    const updateData = await axios
      .put(`http://localhost:2022/updateUser/${params.id}`, credentials, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        toast.success("Updated", toastOptions);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/users", { replace: true });
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5">
        <div class="card-header py-3 mb-2 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Update User</h6>
        </div>
        <div className="card-body">
          <div className="row user-row">
            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
              <input
                type="text"
                className="form-control"
                placeholder="username"
                id="first_name"
                name="first_name"
                value={credentials.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
              <input
                type="text"
                className="form-control"
                placeholder="surname"
                id="surname"
                name="surname"
                value={credentials.surname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
              <label>Change To Admin (true/false) </label>
              <input
                type="text"
                className="form-control"
                placeholder="isAdmin"
                id="isAdmin"
                name="isAdmin"
                value={credentials.isAdmin}
                onChange={handleChange}
              />
            </div>
            <div className="col-4 mt-5 ms-2">
              <Link to={"/users"}>
                <button className="btn btn-danger btn-sm me-2">cancel</button>
              </Link>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleUpdate()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default EditUser;
