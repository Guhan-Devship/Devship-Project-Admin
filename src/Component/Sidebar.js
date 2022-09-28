import React, { useState } from "react";
import { Link } from "react-router-dom";
import admin from "../icons/admin.png";

function Sidebar() {
  return (
    <>
      <div className="sidebar-scroll">
        <ul
          class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <a class="sidebar-brand d-flex align-items-center justify-content-center">
            <div class="sidebar-brand-icon rotate-n-15">
              <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Admin Page</div>
          </a>
          <hr class="sidebar-divider my-0" />
          <li class="nav-item active">
            <Link to={"dashboard"} class="nav-link">
              <i class="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <hr class="sidebar-divider" />
          <div class="sidebar-heading">Pages</div>
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i class="fa fa-fw fa-cog"></i>
              <span>Components</span>
            </a>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Custom Components:</h6>
                <Link to={"users"} class="collapse-item">
                  Users
                </Link>
                <Link to={"product"} class="collapse-item">
                  Products
                </Link>
                <Link to={"order"} class="collapse-item">
                  orders
                </Link>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              data-toggle="collapse"
              data-target="#collapseUtilities"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <i class="fa fa-fw fa-wrench"></i>
              <span>Utilities</span>
            </a>
            <div
              id="collapseUtilities"
              class="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Custom Utilities:</h6>
                <Link to={"contact"} class="collapse-item">
                  Contact
                </Link>
                <Link to={"upload"} class="collapse-item">
                  Uploads
                </Link>
                <Link to={"role"} class="collapse-item">
                  Role
                </Link>
                <Link to={"skill"} class="collapse-item">
                  Skill
                </Link>
                <Link to={"formList"} class="collapse-item">
                  Form
                </Link>
              </div>
            </div>
          </li>
          <hr class="sidebar-divider" />
          <div class="sidebar-heading">Security</div>
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="true"
              aria-controls="collapsePages"
            >
              <i class="fa fa-fw fa-folder"></i>
              <span>Accounts</span>
            </a>
            <div
              id="collapsePages"
              class="collapse"
              aria-labelledby="headingPages"
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Accounts:</h6>
                <Link to={"/overview/profile"} class="collapse-item">
                  Overview
                </Link>
                <Link to={"/overview/setting"} class="collapse-item">
                  Edit
                </Link>
              </div>
            </div>
          </li>
          <hr class="sidebar-divider d-none d-md-block" />
          <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
