import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import CreateSkill from "./CreateSkill";
import EditSkill from "./EditSkill";
import { UserContext } from "../../context/UserContext";

function Skill() {
  const { users } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [openEditSkill, setOpenEditSkill] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [editData, setEditData] = useState([]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleClick = () => {
    setOpenModal(true);
  };

  let getdata = async () => {
    request({
      url: `getSkill`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setSkillData(res);
      console.log(res);
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to remove this Skill?"
      );
      if (ask) {
        request({
          url: `deleteSkill/${id}`,
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
  const handleEditClick = (id) => {
    try {
      request({
        url: `getSkillby/${id}`,
        method: "GET",
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        setEditData(res);
        setOpenEditSkill(true);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Skill</h1>
      </div>
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">
            Skill List<br></br>
          </h6>
          <p></p>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleClick}
            disabled={users.skillCreate !== true}
          >
            Create Skill
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
                  <th>Skill</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {skillData.map((list) => {
                  return (
                    <tr>
                      <td>{list.skill_name}</td>
                      <td>
                        <button
                          class="btn btn-outline-danger btn-sm ms-2"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="delete"
                          onClick={() => handleDelete(list._id)}
                          disabled={users.skillDelete !== true}
                        >
                          Remove
                        </button>
                        <button
                          className="btn btn-outline-warning btn-sm ms-2"
                          onClick={() => handleEditClick(list._id)}
                          disabled={users.skillEdit !== true}
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
      {openModal && <CreateSkill setOpen={setOpenModal} getdata={getdata} />}
      {openEditSkill && (
        <EditSkill
          setOpenEditSkill={setOpenEditSkill}
          editData={editData}
          getdata={getdata}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default Skill;
