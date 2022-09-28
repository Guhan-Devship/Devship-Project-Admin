import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { createContext } from "react";
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

function App() {
  let user = localStorage.getItem("myapptoken");
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
                    <Route path="users" element={<User />} />
                    <Route path="product" element={<Product />} />
                    <Route path="order" element={<Order />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="upload" element={<MultiImageUpload />} />
                    <Route path="role" element={<Role />} />
                    <Route path="skill" element={<Skill />} />
                    <Route path="formlist" element={<FormList />} />
                  </Route>
                  <Route path="/overview" element={<Profile />}>
                    <Route path="profile" element={<OverView />} />
                    <Route path="setting" element={<Setting />} />
                  </Route>
                  <Route path="formlist/create" element={<Form />} />
                  <Route path="formlist/view/:id" element={<ViewForm />} />
                  <Route path="formlist/editform/:id" element={<EditForm />} />
                  <Route path="users/createnew" element={<UserCreate />} />
                  <Route path="users/edit-user/:id" element={<EditUser />} />
                  <Route path="users/view-user/:id" element={<ViewUser />} />
                  <Route path="/create-category" element={<CreateProduct />} />
                  <Route path="/view/:id" element={<ListProduct />} />
                  <Route path="/create-product" element={<CreateNew />} />
                  <Route path="/viewList/:id" element={<ViewProduct />} />
                  <Route path="/editList/:id" element={<EditProduct />} />
                  <Route path="/create-contact" element={<CreateContact />} />
                  <Route path="/view-contact/:id" element={<ViewContact />} />
                  <Route path="/edit-contact/:id" element={<EditContact />} />
                  <Route path="/ref" element={<UseRef />} />
                  <Route path="/call" element={<UseCallBack />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/reducer" element={<UseReducer />} />
                  <Route path="/memo" element={<UseMemo />} />
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
