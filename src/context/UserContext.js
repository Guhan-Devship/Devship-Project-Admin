import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import request from "../api/api";
const UserContext = createContext({
  users: {},
  setUserData: () => {},
});

const UserProvider = ({ children }) => {
  let userId = localStorage.getItem("id");
  let role = localStorage.getItem("role");
  const [users, setUserData] = useState({});
  useEffect(() => {
    if (role === "admin") {
      fetchAdmin();
    } else {
      fetchSubAdmin();
    }
  }, []);
  async function fetchAdmin() {
    request({
      url: `getadmin/${userId}`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setUserData(res);
    });
  }
  async function fetchSubAdmin() {
    let user = await axios.get(`http://localhost:2022/getsubadmin/${userId}`, {
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    });
    setUserData(user.data);
  }
  const user = useMemo(() => ({ users, setUserData }), [users]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
