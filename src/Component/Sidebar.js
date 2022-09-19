import React, { useState } from "react";
import { Link } from "react-router-dom";
import admin from "../icons/admin.png";

function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <Link
        to={"/home"}
        class="sidebar-brand d-flex align-items-center justify-content-center"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <img className="admin-logo" src={admin} />
        </div>
        <div class="sidebar-brand-text m-3">Admin Page</div>
      </Link>

      {/* <!-- Divider --> */}

      <li class="nav-item">
        <i class="fa fa-home" aria-hidden="true"></i>
        <Link class="nav-link sidebar-link m-2" to={"/home"}>
          <span>Home</span>
        </Link>
      </li>

      {/* <!-- Nav Item - Dashboard --> */}
      <li class="nav-item">
        <Link class="nav-link sidebar-link m-2" to={"home/users"}>
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>User</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}

      {/* <!-- Nav Item - Charts --> */}
      <li class="nav-item">
        <Link class="nav-link sidebar-link m-2" to={"home/product"}>
          <i class="fas fa-fw fa-table"></i>
          <span>Product</span>
        </Link>
      </li>

      {/* <!-- Nav Item - Tables --> */}
      <li class="nav-item">
        <Link class="nav-link sidebar-link m-2" to={"home/contact"}>
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Contact</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <li class="nav-item">
        <Link class="nav-link sidebar-link m-2" to={"home/order"}>
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Order</span>
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link sidebar-link m-2" to={"home/upload"}>
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Uploads</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
