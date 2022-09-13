import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Component/Navbar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Contact() {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [contact, setContact] = useState([]);
  async function fetchAll() {
    try {
      let listData = await axios.get("http://localhost:2022/allcontact", {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
      setContact(listData.data);
      console.log(listData.data);
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
        await axios.delete(`http://localhost:2022/deleteContact/${id}`, {
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
  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Contact</h1>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">
            Contact List<br></br>
            <span className="notes">
              {" "}
              Note * If you need to add the address go to edit page and update
              the user
            </span>
          </h6>
          <p></p>
          <Link to={"/create-contact"}>
            <button className="btn btn-primary btn-sm">Create Contact</button>
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
                  <th>Organisation</th>
                  <th>Gender</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contact.map((data) => {
                  return (
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.organisation}</td>
                      <td>{data.gender}</td>
                      <td>{data.mobile}</td>
                      <td>{data.email}</td>
                      <td>{data.message}</td>
                      <td>
                        <button
                          class="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => handleDelete(data._id)}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="delete"
                        >
                          Remove
                        </button>
                        <Link to={`/edit-contact/${data._id}`}>
                          <button className="btn btn-outline-warning btn-sm ms-2">
                            Edit
                          </button>
                        </Link>
                        <Link to={`/view-contact/${data._id}`}>
                          <button className="btn btn-outline-primary btn-sm ms-2">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Link to={"/home"}>
          <button className="btn btn-primary btn-sm m-4">Back</button>
        </Link>
      </div>
      <ToastContainer />
    </>
  );
}

export default Contact;
