import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./login/Login";
import Home from "./home/Home";
import User from "./Pages/user/User";
import EditUser from "./Pages/user/EditUser";
import Product from "./Pages/product/Product";
import CreateProduct from "./Pages/product/CreateProduct";
import ListProduct from "./Pages/product/ListProduct";
import CreateNew from "./Pages/product/CreateNew";
import ViewProduct from "./Pages/product/ViewProduct";
import EditProduct from "./Pages/product/EditProduct";
import ViewUser from "./Pages/user/ViewUser";
import Order from "./Pages/order/Oder";
import Profile from "./Pages/profile/Profile";
import Contact from "./Pages/contact/Contact";
import CreateContact from "./Pages/contact/CreateContact";
import ViewContact from "./Pages/contact/ViewConatct";
import EditContact from "./Pages/contact/EditContact";
import { createContext, useContext, useEffect, useState } from "react";
import UseRef from "./Prcatice/UseRef";
import UseCallBack from "./Prcatice/UseCallBack";
import Form from "./Prcatice/Form";
import Sidebar from "./Component/Sidebar";
import Navbar from "./Component/Navbar";
import UseReducer from "./Prcatice/UseReducer";
import UseMemo from "./Prcatice/UseMemo";
import MultiImageUpload from "./Prcatice/MultiImageUpload";
import UserCreate from "./Pages/user/UserCreate";
import Dashboard from "./Component/Dashboard";
import OverView from "./Pages/profile/OverView";
import Setting from "./Pages/profile/Setting";
import Role from "./Pages/role/Role";
import FormList from "./Prcatice/FormList";
import ViewForm from "./Prcatice/ViewForm";
import EditForm from "./Prcatice/EditForm";
import Skill from "./Pages/skill/Skill";
import Pricing from "./Pages/pricing/Pricing";
import Subadmins from "./Pages/profile/subadmins/Subadmins";
import { UserContext } from "./context/UserContext";
import Drive from "./Pages/Drive/Drive";
import ViewFolder from "./Pages/Drive/ViewFolder";
import RequestLogin from "./login/RequestLogin";

function App() {
  let user = localStorage.getItem("myapptoken");
  const { users, setUserData } = useContext(UserContext);
  return (
    <BrowserRouter>
      {user ? (
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Navbar />
              <div class="container-fluid">
                <Routes>
                  <Route path="/" element={<Home />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    {users.users === true ? (
                      <Route path="users" element={<User />} />
                    ) : (
                      ""
                    )}
                    {users.products === true ? (
                      <Route path="product" element={<Product />} />
                    ) : (
                      ""
                    )}
                    {users.orders === true ? (
                      <Route path="order" element={<Order />} />
                    ) : (
                      ""
                    )}
                    {users.utilitiContact === true ? (
                      <Route path="contact" element={<Contact />} />
                    ) : (
                      ""
                    )}
                    {users.utilitiRole === true ? (
                      <Route path="role" element={<Role />} />
                    ) : (
                      ""
                    )}
                    {users.utilitiSkill === true ? (
                      <Route path="skill" element={<Skill />} />
                    ) : (
                      ""
                    )}
                    {users.utilitiForm === true ? (
                      <Route path="formlist" element={<FormList />} />
                    ) : (
                      ""
                    )}
                    {users.utilitiPricing === true ? (
                      <Route path="pricing" element={<Pricing />} />
                    ) : (
                      ""
                    )}
                    <Route path="upload" element={<MultiImageUpload />} />
                    <Route path="drive" element={<Drive />} />
                  </Route>
                  <Route path="/overview" element={<Profile />}>
                    <Route path="profile" element={<OverView />} />
                    <Route path="setting" element={<Setting />} />
                    <Route path="subadmins" element={<Subadmins />} />
                  </Route>
                  <Route path="formlist/create" element={<Form />} />
                  <Route path="formlist/view/:id" element={<ViewForm />} />
                  <Route path="formlist/editform/:id" element={<EditForm />} />
                  {users.role === "admin" ? (
                    <Route path="users/createnew" element={<UserCreate />} />
                  ) : (
                    ""
                  )}

                  {users.userView === true ? (
                    <Route path="users/view-user/:id" element={<ViewUser />} />
                  ) : (
                    ""
                  )}
                  {users.userEdit === true ? (
                    <Route path="users/edit-user/:id" element={<EditUser />} />
                  ) : (
                    ""
                  )}
                  {users.role === "admin" ? (
                    <Route
                      path="/create-category"
                      element={<CreateProduct />}
                    />
                  ) : (
                    ""
                  )}

                  <Route path="/view/:id" element={<ListProduct />} />
                  <Route path="/create-product" element={<CreateNew />} />
                  {users.productView === true ? (
                    <Route path="/viewList/:id" element={<ViewProduct />} />
                  ) : (
                    ""
                  )}
                  {users.productsEdit === true ? (
                    <Route path="/editList/:id" element={<EditProduct />} />
                  ) : (
                    ""
                  )}
                  {users.role === "admin" ? (
                    <Route path="/create-contact" element={<CreateContact />} />
                  ) : (
                    ""
                  )}

                  {users.contactView === true ? (
                    <Route path="/view-contact/:id" element={<ViewContact />} />
                  ) : (
                    ""
                  )}
                  {users.contactEdit === true ? (
                    <Route path="/edit-contact/:id" element={<EditContact />} />
                  ) : (
                    ""
                  )}

                  <Route path="/viewfolder/:id" element={<ViewFolder />}>
                    <Route path=":id" element={<ViewFolder />} />
                  </Route>
                  <Route path="/ref" element={<UseRef />} />
                  <Route path="/call" element={<UseCallBack />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/reducer" element={<UseReducer />} />
                  <Route path="/memo" element={<UseMemo />} />
                  <Route
                    path="/404"
                    element={
                      <div className="text-center mt-5">
                        Choose the correct path{" "}
                        <div>
                          <h3>Error 404 page not found</h3>
                        </div>
                      </div>
                    }
                  />
                  <Route
                    path="/401"
                    element={
                      <div className="text-center mt-5">
                        <div>
                          <h3>Error 401 Unauthorized page</h3>
                        </div>
                      </div>
                    }
                  />
                  <Route path="*" element={<Navigate replace to="/404" />} />
                  <Route
                    path="/login/subadmin/:uuid"
                    element={<RequestLogin />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
