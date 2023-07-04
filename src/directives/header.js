import React, { Component, useEffect, useState } from 'react'

import config from '../coreFIles/config'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'

const Header = () => {

  const loginData = (!Cookies.get('loginSuccessBlackeverythingAdmin')) ? [] : JSON.parse(Cookies.get('loginSuccessBlackeverythingAdmin'));
    if (!loginData || loginData == '') {
      window.location.href = `${config.baseUrl}`;
    }

  useEffect(() => {

  })

  const logout = async () => {
    Cookies.remove('loginSuccessBlackeverythingAdmin');
    window.location.href = config.baseUrl;
}

    return (

        <>
        <header className="main-header">
  <div className="d-flex align-items-center logo-box justify-content-start">
    {/* Logo */}
    <a href="" className="logo">
      {/* logo*/}
      <div className="logo-mini w-50">
        <span className="light-logo">
          <img src="./images/logo.png" alt="logo" />
        </span>
        <span className="dark-logo">
          <img src="./images/logo.png" alt="logo" />
        </span>
      </div>
      <div className="logo-lg">
        <span className="light-logo">
          <img src="./images/logo.png" alt="logo" />
          Blackeverything
        </span>
        <span className="dark-logo">
          <img src="./images/logo.png" alt="logo" />
        </span>
      </div>
    </a>
  </div>
  {/* Header Navbar */}
  <nav className="navbar navbar-static-top">
    {/* Sidebar toggle button*/}
    <div className="app-menu">
      <ul className="header-megamenu nav">
        <li className="btn-group nav-item">
          <a
            href="#"
            className="waves-effect waves-light nav-link push-btn btn-primary-light"
            data-toggle="push-menu"
            role="button"
          >
            <i data-feather="align-left" />
          </a>
        </li>
        {/* <li className="btn-group d-lg-inline-flex d-none">
          <div className="app-menu">
            <div className="search-bx mx-5">
              <form>
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn" type="submit" id="button-addon3">
                      <i data-feather="search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </li> */}
      </ul>
    </div>
    <div className="navbar-custom-menu r-side">
      <ul className="nav navbar-nav">
       
        {/* <li className="btn-group d-lg-inline-flex d-none">
          <a
            href="#"
            data-provide="fullscreen"
            className="waves-effect waves-light full-screen btn-warning-light"
            title="Full Screen"
          >
            <i data-feather="maximize" />
          </a>
        </li> */}
        {/* Notifications */}
        {/* <li className="dropdown notifications-menu">
          <a
            href="#"
            className="waves-effect waves-light dropdown-toggle btn-info-light"
            data-bs-toggle="dropdown"
            title="Notifications"
          >
            <i data-feather="bell" />
          </a>
          <ul className="dropdown-menu animated bounceIn">
            <li className="header">
              <div className="p-20">
                <div className="flexbox">
                  <div>
                    <h4 className="mb-0 mt-0">Notifications</h4>
                  </div>
                  <div>
                    <a href="#" className="text-danger">
                      Clear All
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
             
              <ul className="menu sm-scrol">
                <li>
                  <a href="#">
                    <i className="fa fa-users text-info" /> Curabitur id eros
                    quis nunc suscipit blandit.
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-warning text-warning" /> Duis malesuada
                    justo eu sapien elementum, in semper diam posuere.
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-users text-danger" /> Donec at nisi sit
                    amet tortor commodo porttitor pretium a erat.
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-shopping-cart text-success" /> In
                    gravida mauris et nisi
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-user text-danger" /> Praesent eu lacus
                    in libero dictum fermentum.
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-user text-primary" /> Nunc fringilla
                    lorem
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-user text-success" /> Nullam euismod
                    dolor ut quam interdum, at scelerisque ipsum imperdiet.
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer">
              <a href="#">View all</a>
            </li>
          </ul>
        </li> */}
        {/* Control Sidebar Toggle Button */}
        
        {/* User Account*/}
        <li className="dropdown user user-menu">
          <a
            href="#"
            className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow"
            data-bs-toggle="dropdown"
            title="User"
          >
            <div className="d-flex pt-5">
              <div className="text-end me-10">
                <p className="pt-5 fs-14 mb-0 fw-700 text-primary">{loginData.username}</p>
                <small className="fs-10 mb-0 text-uppercase text-white">
                  Admin
                </small>
              </div>
              <img
                src="./images/avatar/avatar-1.png"
                className="avatar rounded-10 bg-primary-light h-40 w-40"
                alt=""
              />
            </div>
          </a>
          <ul className="dropdown-menu animated flipInX">
          <li className="user-body">
             
             <a className="dropdown-item" href="changepassword">
               <i className="ti-lock text-muted me-2" /> Change Password
             </a>
           </li>
            <li className="user-body">
              {/* <a className="dropdown-item" href="#">
                <i className="ti-user text-muted me-2" /> Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="ti-wallet text-muted me-2" /> My Wallet
              </a>
              <a className="dropdown-item" href="#">
                <i className="ti-settings text-muted me-2" /> Settings
              </a> */}
              {/* <div className="dropdown-divider" /> */}
              <a className="dropdown-item" href="javascript:;" onClick={logout}>
                <i className="ti-lock text-muted me-2" /> Logout
              </a>
            </li>
          
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</header>

        </>
    )
}
export default Header;