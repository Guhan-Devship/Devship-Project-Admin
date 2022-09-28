import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import request from "../../api/api";

function EditSkill({ setOpenEditSkill, editData, getdata }) {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [skillName, setSkillName] = useState({
    skill_name: editData.skill_name,
  });
  const handleChange = (e) => {
    setSkillName((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleValidation = () => {
    const { skill_name } = skillName;
    if (skill_name === "") {
      toast.error("Skill name is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleClick = (id, e) => {
    e.preventDefault();
    console.log(id);
    try {
      request({
        url: `updateSkill/${id}`,
        method: "PUT",
        data: skillName,
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        toast.success(res.message, toastOptions);
        setOpenEditSkill(false);
        getdata();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <button
          className="btn btn-sm btn-danger rounded-circle mx-1"
          onClick={() => setOpenEditSkill(false)}
        >
          X
        </button>
        <span>Edit Skill Name</span>
        <form>
          <div className="row m-3">
            <div className="col-4">Skill Name :</div>
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Skill Name"
                id="skill_name"
                name="skill_name"
                value={skillName.skill_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="rButton"
            onClick={(e) => handleClick(editData._id, e)}
          >
            Update
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditSkill;
