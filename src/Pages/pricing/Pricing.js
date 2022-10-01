import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import request from "../../api/api";
import CreatePricing from "./CreatePricing";

function Pricing() {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [pricing, setPricing] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    setPricing((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to remove this Cart?"
      );
      if (ask) {
        request({
          url: `deletePricing/${id}`,
          method: "DELETE",
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }).then((res) => {
          toast.success("Removed", toastOptions);
          getdata();
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  let getdata = async () => {
    request({
      url: `getPricing`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setPricing(res);
      console.log(res);
    });
  };
  useEffect(() => {
    getdata();
  }, []);
  const handleEditClick = (id) => {
    try {
      //   request({
      //     url: `getRoleby/${id}`,
      //     method: "GET",
      //     headers: {
      //       Authorization: window.localStorage.getItem("myapptoken"),
      //     },
      //   }).then((res) => {
      //     setEditData(res);
      //     setOpenEditRole(true);
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Pricing</h1>
      </div>
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">
            Price List<br></br>
          </h6>
          <p></p>
          <button className="btn btn-primary btn-sm" onClick={handleClick}>
            Create New
          </button>
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
                  <th>Price Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((list) => {
                  return (
                    <tr>
                      <td>{list.pricing_name}</td>
                      <td>{list.price}</td>
                      <td>
                        <button
                          class="btn btn-outline-danger btn-sm ms-2"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="delete"
                          onClick={() => handleDelete(list._id)}
                        >
                          Remove
                        </button>
                        <button
                          className="btn btn-outline-warning btn-sm ms-2"
                          //   onClick={() => handleEditClick(list._id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openModal && <CreatePricing setOpen={setOpenModal} getdata={getdata} />}
      {/* {openEditRole && (
        <EditRole
          setOpenEditRole={setOpenEditRole}
          editData={editData}
          getdata={getdata}
        />
      )} */}
      <ToastContainer />
    </>
  );
}

export default Pricing;
