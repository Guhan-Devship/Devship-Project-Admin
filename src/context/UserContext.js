import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
const UserContext = createContext({
  users: {},
  setUserData: () => {},
});

const UserProvider = ({ children }) => {
  let userId = localStorage.getItem("id");
  const [users, setUserData] = useState({});
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    let user = await axios.get(`http://localhost:2022/getUser/${userId}`, {
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
