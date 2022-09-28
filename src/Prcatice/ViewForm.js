import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import request from "../api/api";
import { toast, ToastContainer } from "react-toastify";

function ViewForm() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  console.log(params.id);
  let getdata = async () => {
    request({
      url: `getforms/${params.id}`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setFormData(res);
      console.log(res);
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  let handleMove = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to Move this form to user?"
      );
      if (ask) {
        request({
          url: `moveform/${id}`,
          method: "POST",
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
      <div className="container">
        <div className="row">
          <div className="col-6 border mt-5">
            <h3>Form Details</h3>
            <div className="d-flex flex-row-reverse">
              {formData.movedToUser === false ? (
                <button
                  className="btn-primary btn-sm"
                  onClick={() => handleMove(formData._id)}
                >
                  Move to client
                </button>
              ) : (
                "Moved to User"
              )}
            </div>
            <div className="row">
              <div className="col-6">
                <p>Firstname</p>
                <p>Surname</p>
                <p>Gender</p>
                <p>Role</p>
                <p>Email</p>
                <p>phone</p>
                <p>skill</p>
              </div>
              <div className="col-6">
                <p>: {formData.first_name}</p>
                <p>: {formData.surname}</p>
                <p>: {formData.gender}</p>
                <p>: {formData.role}</p>
                <p>: {formData.email}</p>
                <p>: {formData?.phone?.number}</p>
                <p>
                  <ul>
                    {formData?.skill?.map((e) => {
                      return <li>{e.value}</li>;
                    })}
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Link to={"/formlist"}>
          <button className="btn btn-danger btn-sm mt-5">Close</button>
        </Link>
        <ToastContainer />
      </div>
    </>
  );
}

export default ViewForm;
