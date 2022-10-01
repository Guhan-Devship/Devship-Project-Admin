import React, { useEffect, useState } from "react";
import useCustomForm from "../Component/UseCustomForm";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import hidepassword from "../icons/hidepassword.png";
import showpassword from "../icons/showPassword.png";
import Select from "react-select";
import request from "../api/api";
import { parseInt } from "lodash";

const initialValues = {
  first_name: "",
  surname: "",
  gender: "",
  skill: "",
  role: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree_terms: false,
  depositAmount: 0,
  totalAmount: 0,
  phone: {
    number: "",
    code: "",
    dialcountry: "",
  },
};

const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "transgender", label: "Transgender" },
];
function Form() {
  const {
    values: inputs,
    setValues,
    handleCheckedChange,
    handleChange,
    handleObjectChange,
    handleSubmit,
    handleSelectChange,
    handleMultiSelectChange,
  } = useCustomForm({
    initialValues,
    onSubmit: () => onSubmit(),
  });
  let navigate = useNavigate();
  const [roleData, setRoleData] = useState([]);
  const [skillData, setSkillData] = useState([]);

  let getdata = async () => {
    request({
      url: `getRole`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setRoleData(res);
    });
  };

  let getSkill = async () => {
    request({
      url: `getSkill`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setSkillData(res);
    });
  };

  let getPricing = async () => {
    request({
      url: `getPricing`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setPricing(res);
    });
  };

  useEffect(() => {
    getdata();
    getSkill();
    getPricing();
  }, []);
  const [pricing, setPricing] = useState([]);
  const getFormattedPrice = (price) => `${price}`;
  const [checkedState, setCheckedState] = useState(new Array(5).fill(false));

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          if (pricing[index].pricing_name !== "Percentage Margin") {
            return sum + pricing[index].price;
          } else {
            return sum + (pricing[index].price / 100) * depositAmount;
          }
        }
        return sum;
      },
      0
    );

    // setTotal(parseInt(depositAmount) + totalPrice);
    setValues({ ...inputs, totalAmount: parseInt(depositAmount) + totalPrice });
  };

  const roleoptions = roleData.map((e) => {
    return { value: `${e.role_name}`, label: `${e.role_name}` };
  });

  const skilloptions = skillData.map((e) => {
    return { value: `${e.skill_name}`, label: `${e.skill_name}` };
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealConfirmPwd, setIsRevealConfirmPwd] = useState(false);
  const {
    first_name,
    surname,
    genderValue,
    roleValue,
    skill,
    email,
    password,
    confirmPassword,
    depositAmount,
    totalAmount,
    agree_terms,
    phone,
  } = inputs;

  const onSubmit = () => {
    if (first_name === "") {
      return toast.error("Firstname required.", {
        id: "fullName",
      });
    }
    if (email === "") {
      return toast.error("Email required.", {
        id: "email",
      });
    } else if (!validateEmail(email)) {
      return toast.error("Invalid email.", {
        id: "email",
      });
    }
    if (password === "") {
      return toast.error("Password required.", {
        id: "password",
      });
    }
    if (password.length < 4) {
      return toast.error("Password must be of minimum 4 characters.", {
        id: "password",
      });
    }
    if (confirmPassword === "") {
      return toast.error("Confirm Password required.", {
        id: "confirmPassword",
      });
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.", {
        id: "fullName",
      });
    }
    if (agree_terms !== true) {
      return toast.error("Agree Terms", {
        id: "agree_terms",
      });
    }
    console.log(inputs);

    request({
      url: `createform`,
      method: "POST",
      data: inputs,
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      console.log(res);
      if (res.status !== 1) {
        toast.error(res.message, toastOptions);
      } else if (res.status === 1) {
        toast.success(res.message, toastOptions);
      }
      navigate("/formlist");
    });
  };
  return (
    <div className="register-wrap">
      <form onSubmit={handleSubmit} className="register">
        <h4 style={{ color: "var(--primary-color)" }}>Sign up</h4>
        <div className="line"></div>
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <input
                type="text"
                className="form-control"
                name="first_name"
                id="newfirstName"
                value={first_name}
                onChange={handleChange}
              />
              <label htmlFor="newfirstName">First Name</label>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <input
                type="text"
                className="form-control"
                name="surname"
                id="newLastName"
                value={surname}
                onChange={handleChange}
              />
              <label htmlFor="newLastName">Last Name</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <Select
                name="gender"
                id="gender"
                defaultValue={genderValue}
                onChange={(e) => handleSelectChange(e, "genderValue")}
                options={options}
              />
              <label htmlFor="gender">Gender</label>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <Select
                name="role"
                id="role"
                placeholder="Role"
                defaultValue={roleValue}
                onChange={(e) => handleSelectChange(e, "roleValue")}
                options={roleoptions}
              />
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 mt-2">
            <div className="form-box">
              <Select
                name="role"
                id="role"
                placeholder="Skill"
                defaultValue={skill}
                onChange={(e) => handleMultiSelectChange(e, "skill")}
                options={skilloptions}
                isMulti
              />
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 mt-2">
            <div className="form-box">
              <input
                type="email"
                className="form-control"
                name="email"
                id="newEmail"
                value={email}
                onChange={handleChange}
              />
              <label htmlFor="newEmail">Email</label>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <input
                type="tel"
                className="form-control"
                name="number"
                id="newPhone"
                value={phone.number}
                onChange={(e) => handleObjectChange(e, phone)}
              />
              <label htmlFor="newPhone">Mobile</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <input
                type={isRevealPwd ? "text" : "password"}
                className="form-control"
                name="password"
                id="newPassword"
                value={password}
                onChange={handleChange}
              />
              <label htmlFor="newPassword">Password</label>
              <img
                src={isRevealPwd ? hidepassword : showpassword}
                className="showpassword"
                alt="eye-icon"
                id="eye-icon"
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              />
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <input
                type={isRevealConfirmPwd ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                id="newConfirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
              <label htmlFor="newConfirmPassword">Confirm Password</label>
              <img
                src={isRevealConfirmPwd ? hidepassword : showpassword}
                className="showpassword"
                alt="eye-icon"
                id="eye-icon"
                onClick={() => setIsRevealConfirmPwd((prevState) => !prevState)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <input
              type="number"
              className="form-control"
              name="depositAmount"
              id="depositAmount"
              value={depositAmount}
              onChange={handleChange}
            />
          </div>
          <div className="col-4">
            <input
              type="number"
              className="form-control"
              name="totalAmount"
              id="totalAmount"
              value={totalAmount}
              onChange={handleChange}
            />
          </div>
          <div className="box-flex">
            {pricing?.map(({ pricing_name, price }, index) => {
              return (
                <li className="pricing-list" key={index}>
                  <div className="tac-box">
                    <input
                      type="checkbox"
                      name={pricing_name}
                      id={`pricing_name-${index}`}
                      value={pricing_name}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    {pricing_name === "Percentage Margin" ? (
                      <label htmlFor={`pricing_name-${index}`}>
                        {pricing_name}
                        --{getFormattedPrice(price)}%
                      </label>
                    ) : (
                      <label htmlFor={`pricing_name-${index}`}>
                        {pricing_name}
                        --Rs {getFormattedPrice(price)}
                      </label>
                    )}
                  </div>
                </li>
              );
            })}
          </div>
        </div>
        <div className="box-flex">
          <div className="tac-box">
            <input
              type="checkbox"
              name="agree_terms"
              onChange={handleCheckedChange}
              checked={agree_terms}
            />
            <label htmlFor="remember-me" id="tac">
              I agree to our{" "}
              <a
                href="https://careagencymedia.co.uk/about-us/terms/"
                target="_blank"
                rel="noopener noreferrer"
              >
                terms and conditions
              </a>{" "}
              &amp;{" "}
              <a
                href="https://careagencymedia.co.uk/about-us/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                privacy policy
              </a>
            </label>
          </div>
        </div>
        <button className="btn-register" type="submit">
          Sign up
        </button>
        <p>
          <span style={{ color: "#757575", paddingRight: "4px" }}>
            Already a user?
          </span>
          Sign in
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}
export default Form;
