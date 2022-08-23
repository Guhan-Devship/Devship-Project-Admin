import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./login/Login";
import Home from "./home/Home";
import User from "./Pages/user/User";
import CreateUser from "./Pages/user/CreateUser";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<User />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/view-user/:id" element={<ViewUser />} />
        <Route path="/product" element={<Product />} />
        <Route path="/create-category" element={<CreateProduct />} />
        <Route path="/view/:id" element={<ListProduct />} />
        <Route path="/create-product" element={<CreateNew />} />
        <Route path="/viewList/:id" element={<ViewProduct />} />
        <Route path="/editList/:id" element={<EditProduct />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-contact" element={<CreateContact />} />
        <Route path="/view-contact/:id" element={<ViewContact />} />
        <Route path="/edit-contact/:id" element={<EditContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
