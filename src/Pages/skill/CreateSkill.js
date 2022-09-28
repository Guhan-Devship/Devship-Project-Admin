import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import request from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

function CreateSkill({ setOpen, getdata }) {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [skillName, setSkillName] = useState({
    skill_name: "",
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

  const handleClick = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log(skillName);
      request({
        url: `newSkill`,
        method: "POST",
        data: skillName,
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        if (res.message !== "Skill Name Created") {
          toast.error(res.message, toastOptions);
        }
        if (res.message === "Skill Name Created") {
          toast.success("SuccessFully Created", toastOptions);
          setOpen(false);
          getdata();
        }
      });
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <button
          className="btn btn-sm btn-danger rounded-circle mx-1"
          onClick={() => setOpen(false)}
        >
          X
        </button>
        <span>Create Roll</span>
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
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="rButton" onClick={handleClick}>
            Create
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateSkill;
