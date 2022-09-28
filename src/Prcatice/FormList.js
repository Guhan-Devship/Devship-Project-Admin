import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import request from "../api/api";

function FormList() {
  const [listData, setListData] = useState([]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let getdata = async () => {
    request({
      url: `getallform`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setListData(res);
      console.log(res);
    });
  };
  useEffect(() => {
    getdata();
  }, []);
  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this User?"
      );
      if (ask) {
        request({
          url: `deleteform/${id}`,
          method: "DELETE",
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }).then((res) => {
          toast.success(res.message, toastOptions);
          getdata();
        });
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
          </h6>
          <p></p>
          <Link to={"create"}>
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
                  <th>First Name</th>
                  <th>Surname</th>
                  <th>Gender</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listData.map((data) => {
                  return (
                    <tr>
                      <td>{data.first_name}</td>
                      <td>{data.surname}</td>
                      <td>{data.gender}</td>
                      <td>{data?.role}</td>
                      <td>{data.email}</td>
                      <td>{data.phone.number}</td>
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
                        <Link to={`editform/${data._id}`}>
                          <button className="btn btn-outline-warning btn-sm ms-2">
                            Edit
                          </button>
                        </Link>
                        <Link to={`view/${data._id}`}>
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
      </div>
      <ToastContainer />
    </>
  );
}

export default FormList;
