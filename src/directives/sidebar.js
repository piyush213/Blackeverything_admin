/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
// import config from '../config/config'
import config from "../coreFIles/config";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [settingValue, setsettingValue] = useState(1)
  const [historyValue, sethistoryValue] = useState(1)
  const [cmsValue, setcmsValue] = useState(1)
  const [exchangeValue, setexchangeValue] = useState(1)

  const [pageUrl, setPageUrl] = useState(window.location.href);
  const loginData = !Cookies.get("loginSuccessBlackeverythingAdmin")
    ? []
    : JSON.parse(Cookies.get("loginSuccessBlackeverythingAdmin"));
  const logout = async () => {
    Cookies.remove("loginSuccessBlackeverythingAdmin");
    window.location.href = config.baseUrl;
  };


  const settingClick = (id) => {

    if (id == 1) {
      setsettingValue(2)
    }
    else if (id == 2) {
      setsettingValue(1)
    }
  }

  const exchangeClick = (id) => {

    if (id == 1) {
      setexchangeValue(2)
    }
    else if (id == 2) {
      setexchangeValue(1)
    }
  }

  const CMSClick = (id) => {

    if (id == 1) {
      setcmsValue(2)
    }
    else if (id == 2) {
      setcmsValue(1)
    }
  }


  const historyClick = (id) => {

    if (id == 1) {
      sethistoryValue(2)
    }
    else if (id == 2) {
      sethistoryValue(1)
    }
  }

  return (
    <>
      <aside className="main-sidebar">
        {/* sidebar*/}
        <section className="sidebar position-relative">
          <div className="multinav">
            <div className="multinav-scroll" style={{ height: "100%" }}>
              {/* sidebar menu*/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className={pageUrl.match("/dashboard") ? "active" : ""}>
                  <a href={`${config.baseUrl}dashboard`}>
                    <i data-feather="home" />
                    <span>Dashboard</span>
                    {/* <span className="pull-right-container">
                  <i className="fa fa-angle-right pull-right" />
                </span> */}
                  </a>
                  {/* <ul className="treeview-menu">
                <li>
                  <a href="#">
                    <i className="ti-more" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="#2">
                    <i className="ti-more" />
                    <span>Dashboard 2</span>
                  </a>
                </li>
                <li>
                  <a href="#3">
                    <i className="ti-more" />
                    <span>Dashboard 3</span>
                  </a>
                </li>
              </ul> */}
                </li>
                {loginData.role == 1 ? (
                  <li className={pageUrl.match("/phase") ? "active" : ""}>
                    <a href={`${config.baseUrl}phase`}>
                      <i data-feather="bar-chart" />
                      <span>Phase</span>
                    </a>
                  </li>


                ) : (
                  ""
                )}


                <li className={pageUrl.match("/withdrawal") ? "active" : ""}>
                  <a href={`${config.baseUrl}withdrawal`}>
                    <i data-feather="download" />
                    <span>BBE Withdrawal</span>
                  </a>
                </li>
                {loginData.role != 4 ? (
                  <li
                    className={
                      pageUrl.match("/users") || pageUrl.match("/userReferrals")
                        ? "active"
                        : ""
                    }
                  >
                    <a href={`${config.baseUrl}users`}>
                      <i data-feather="user" />
                      <span>Users</span>
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {loginData.role == 1 || loginData.role == 2 ? (
                  <li className={pageUrl.match("/withdrawal") ? "active" : ""}>
                    <a href={`${config.baseUrl}withdrawal`}>
                      <i data-feather="download" />
                      <span>BBE Withdrawal</span>
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {/* <li className={pageUrl.match('/systemsetting') || pageUrl.match('/stakingsetting') || pageUrl.match('/dynamicsellprice') ? 'treeview active' : 'treeview'}> */}
                <li className={settingValue == 1 ? "treeview" : "treeview menu-open"} onClick={e => settingClick(settingValue)}>

                  <a href="#">
                    <i data-feather="settings" />
                    <span>Settings </span>

                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu" style={{ display: settingValue == 1 ? 'none' : 'block' }}>
                    <li>
                      <a href={`${config.baseUrl}systemsetting`}>
                        <i className="ti-more" />
                        <span>System Settings</span>
                      </a>
                    </li>
                    <li className={pageUrl.match("/phase") ? "active" : ""}>
                      <a href={`${config.baseUrl}phase`}>
                        <i className="ti-more" />
                        <span>Phase</span>
                      </a>
                    </li>
                    {/* <li>
                      <a href={`${config.baseUrl}stakingsetting`}>
                        <i className="ti-more" />
                        <span>Staking Settings</span>
                      </a>
                    </li> */}
                    {/* <li>
                      <a href={`${config.baseUrl}dynamicsellprice`}>
                        <i className="ti-more" />
                        <span>Dynamic Sell Price</span>
                      </a>
                    </li> */}

                  </ul>



                </li>


                <li className={exchangeValue == 1 ? "treeview" : "treeview menu-open"} onClick={e => exchangeClick(exchangeValue)}>

                  <a href="#">
                    <i data-feather="user" />
                    <span>Exchange </span>

                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu" style={{ display: exchangeValue == 1 ? 'none' : 'block' }}>
                    <li className={pageUrl.match("/announcements") ? "active" : ""}>
                      <a href={`${config.baseUrl}announcements`}>
                        {/* <i className="ti-more" /> */}
                        <img src="images/megaphone.png" />
                        <span>Announcements</span>
                      </a>
                    </li>
                    {/* <li className={pageUrl.match("/supportmanagement") ? "active" : ""}>
                      <a href={`${config.baseUrl}supportmanagement`}>
                      <img src="images/help.png" />
                        <span>Support Management</span>
                      </a>
                    </li> */}
                    <li className={pageUrl.match("/depositInr") ? "active" : ""}>
                      <a href={`${config.baseUrl}depositInr`}>
                      <img src="images/wallet.png" />
                        <span>Deposit INR</span>
                      </a>
                    </li>
                    {/* <li className={pageUrl.match("/ordertablemanagement") ? "active" : ""}>
                      <a href={`${config.baseUrl}ordertablemanagement`}>
                      <img src="images/table.png" />
                        <span>Order Table Management</span>
                      </a>
                    </li> */}
                    <li className={pageUrl.match("/pairlist") ? "active" : ""}>
                      <a href={`${config.baseUrl}pairlist`}>
                      <img src="images/crypto.png" />
                        <span>Pair List</span>
                      </a>
                    </li>
                    <li className={pageUrl.match("/walletmanagement") ? "active" : ""}>
                      <a href={`${config.baseUrl}walletmanagement`}>
                      <img src="images/wallet1.png" />
                        <span>Wallet Management</span>
                      </a>
                    </li>
                    <li className={pageUrl.match("/reportmanagement") ? "active" : ""}>
                      <a href={`${config.baseUrl}reportmanagement`}>
                      <img src="images/report.png" />
                        <span>Report Management</span>
                      </a>
                    </li>
                    {/* <li>
                      <a href={`${config.baseUrl}stakingsetting`}>
                        <i className="ti-more" />
                        <span>Staking Settings</span>
                      </a>
                    </li> */}
                    {/* <li>
                      <a href={`${config.baseUrl}dynamicsellprice`}>
                        <i className="ti-more" />
                        <span>Dynamic Sell Price</span>
                      </a>
                    </li> */}

                  </ul>



                </li>
                {/* <li
                    className={
                      pageUrl.match("/sellhistory") ||
                        pageUrl.match("/stakinghistory")
                        ? "treeview active"
                        : "treeview"
                    }
                  > */}
                <li className={historyValue == 1 ? "treeview" : "treeview menu-open"} onClick={e => historyClick(historyValue)}>

                  <a href="#">
                    <i data-feather="list" />
                    <span>History </span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right" />
                    </span>
                  </a>
                  {/* <ul className="treeview-menu"> */}
                  <ul className="treeview-menu" style={{ display: historyValue == 1 ? 'none' : 'block' }}>

                    <li>
                      <a href={`${config.baseUrl}sellhistory`}>
                        <i className="ti-more" />
                        <span>Sale History</span>
                      </a>
                    </li>
                    <li>
                      <a href={`${config.baseUrl}stakinghistory`}>
                        <i className="ti-more" />
                        <span>Staking History</span>
                      </a>
                    </li>
                  </ul>
                </li>

                {loginData.role == 1 || loginData.role == 4 ? (
                  <li
                    className={
                      pageUrl.match("/Blog") ||
                        pageUrl.match("/Blogslider") ||
                        pageUrl.match("/addblog")
                        ? "treeview active"
                        : "treeview"
                    }
                  >
                    <a href="#">
                      <i data-feather="book" />
                      <span>Blogs </span>
                      <span className="pull-right-container">
                        <i className="fa fa-angle-right pull-right" />
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href={`${config.baseUrl}Blog`}>
                          <i className="ti-more" />
                          <span>All Blogs</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  ""
                )}

                {loginData.role == 1 ? (
                  <li
                    className={
                      pageUrl.match("/Academy") ||
                        pageUrl.match("/Latestreleases") ||
                        pageUrl.match("/LatestRealesesupdate") ||
                        pageUrl.match("/Tradersguide") ||
                        pageUrl.match("/Articleupdate")
                        ? "treeview active"
                        : "treeview"
                    }
                  >
                    <a href="#">
                      <i data-feather="list" />
                      <span>Academy </span>
                      <span className="pull-right-container">
                        <i className="fa fa-angle-right pull-right" />
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href={`${config.baseUrl}Latestreleases`}>
                          <i className="ti-more" />
                          <span>Latest Releases</span>
                        </a>
                      </li>

                      <li>
                        <a href={`${config.baseUrl}Tradersguide`}>
                          <i className="ti-more" />
                          <span>Article</span>
                        </a>
                      </li>
                      <li>
                        <a href={`${config.baseUrl}Articlecategory`}>
                          <i className="ti-more" />
                          <span>Article Category</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  ""
                )}

                {loginData.role == 1 || loginData.role == 4 ? (
                  <li className={pageUrl.match("/Achiever") ? "active" : ""}>
                    <a href={`${config.baseUrl}Achiever`}>
                      <i data-feather="user" />
                      <span>Achiever</span>
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {loginData.role == 1 || loginData.role == 4 ? (
                  <li className={pageUrl.match("/Vedio") ? "active" : ""}>
                    <a href={`${config.baseUrl}Vedios`}>
                      <i data-feather="user" />
                      <span>Videos</span>
                    </a>
                  </li>
                ) : (
                  ""
                )}

                <li className={pageUrl.match("/subscribers") ? "active" : ""}>
                  <a href={`${config.baseUrl}subscribers`}>
                    <i data-feather="user" />
                    <span>Subscribers List</span>
                  </a>
                </li>

                <li className={pageUrl.match("/subscribers") ? "active" : ""}>
                  <a href={`${config.baseUrl}BuyTransactions`}>
                    <i data-feather="user" />
                    <span>Transaction</span>
                  </a>
                </li>

                {/* <li className={pageUrl.match("/bankdetails") ? "active" : ""}>
                  <a href={`${config.baseUrl}bankdetails`}>
                    <img src="images/bankDetails.png" />
                    <span>Admin Bank Details</span>
                  </a>
                </li> */}

                <li className={pageUrl.match("/kycdetails") ? "active" : ""}>
                  <a href={`${config.baseUrl}kycdetails`}>
                    <img src="images/kyc.png" />
                    <span>Kyc Details</span>
                  </a>
                </li>

                {/* <li className={pageUrl.match("/withdrawal") ? "active" : ""}>
                      <a href={`${config.baseUrl}withdrawal`}>
                      <img src="images/withdraw.png"/>
                        <span>Withdraw Request</span>
                      </a>
                    </li> */}

                {/* <li className={pageUrl.match("/userbankdetails") ? "active" : ""}>
                  <a href={`${config.baseUrl}userbankdetails`}>
                    <img src="images/bankDetails.png" />
                    <span>User Bank Details</span>
                  </a>
                </li> */}

                {/* <li
                  className={
                    pageUrl.match("/Gallary") ||
                      pageUrl.match("/Addgallary") ||
                      pageUrl.match("/Updategallary") ||
                      pageUrl.match("/Category") ||
                      pageUrl.match("/Addcategory") ||
                      pageUrl.match("/Updatecategory")
                      ? "treeview active"
                      : "treeview"
                  }
                >
                  <a href="#">
                    <i data-feather="image" />
                    <span>Exchange </span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li>
                      <a href={`${config.baseUrl}faqs`}>
                        <i className="ti-more" />
                        <span> Faq</span>
                      </a>
                    </li>
                  </ul>
                </li> */}

                {/* <li
                  className={
                    pageUrl.match("/Gallary") ||
                      pageUrl.match("/Addgallary") ||
                      pageUrl.match("/Updategallary") ||
                      pageUrl.match("/Category") ||
                      pageUrl.match("/Addcategory") ||
                      pageUrl.match("/Updatecategory")
                      ? "treeview active"
                      : "treeview"
                  }
                > */}
                 {/* <li className={pageUrl.match("/announcements") ? "active" : ""}>
                  <a href={`${config.baseUrl}announcements`}>
                    <img src="images/megaphone.png" />
                    <span>Announcements</span>
                  </a>
                </li>

                <li className={pageUrl.match("/supportmanagement") ? "active" : ""}>
                  <a href={`${config.baseUrl}supportmanagement`}>
                    <img src="images/help.png" />
                    <span>Support Management</span>
                  </a>
                </li>

                <li className={pageUrl.match("/depositInr") ? "active" : ""}>
                  <a href={`${config.baseUrl}depositInr`}>
                    <img src="images/wallet.png" />
                    <span>Deposit INR</span>
                  </a>
                </li>

                <li className={pageUrl.match("/ordertablemanagement") ? "active" : ""}>
                  <a href={`${config.baseUrl}ordertablemanagement`}>
                    <img src="images/table.png" />
                    <span>Order Table Management</span>
                  </a>
                </li>

                <li className={pageUrl.match("/pairlist") ? "active" : ""}>
                  <a href={`${config.baseUrl}pairlist`}>
                    <img src="images/crypto.png" />
                    <span>Pair List</span>
                  </a>
                </li>

                <li className={pageUrl.match("/walletmanagement") ? "active" : ""}>
                  <a href={`${config.baseUrl}walletmanagement`}>
                    <img src="images/wallet1.png" />
                    <span>Wallet Management</span>
                  </a>
                </li>

                <li className={pageUrl.match("/reportmanagement") ? "active" : ""}>
                  <a href={`${config.baseUrl}reportmanagement`}>
                    <img src="images/report.png" />
                    <span>Report Management</span>
                  </a>
                </li> */}

                <li className={cmsValue == 1 ? "treeview" : "treeview menu-open"} onClick={e => CMSClick(cmsValue)}>

                  <a href="#">
                    <i data-feather="image" />
                    <span>CMS DATA </span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu" style={{ display: cmsValue == 1 ? 'none' : 'block' }}>
                    <li>
                      <a href={`${config.baseUrl}faqs`}>
                        <i className="ti-more" />
                        <span> Faq</span>
                      </a>
                    </li>

                    <li>
                      <a href={`${config.baseUrl}aboutus`}>
                        <i className="ti-more" />
                        <span>About Us</span>
                      </a>
                    </li>

                    <li>
                      <a href={`${config.baseUrl}tou`}>
                        <i className="ti-more" />
                        <span>Terms of use</span>
                      </a>
                    </li>

                    <li>
                      <a href={`${config.baseUrl}privacypolicy`}>
                        <i className="ti-more" />
                        <span>Privacy Policy</span>
                      </a>
                    </li>


                    <li>
                      <a href={`${config.baseUrl}cookiepolicy`}>
                        <i className="ti-more" />
                        <span>Cookie Policy</span>
                      </a>
                    </li>

                    <li>
                      <a href={`${config.baseUrl}contactus`}>
                        <i className="ti-more" />
                        <span>Contact Us</span>
                      </a>
                    </li>

                    {/* <li>
                      <a href={`${config.baseUrl}bankdetails`}>
                        <i className="ti-more" />
                        <span>Admin Bank Details</span>
                      </a>
                    </li> */}

                    {/* <li>
                      exchange
                      <a href={`${config.baseUrl}depositinrcontent`}>
                        <i className="ti-more" />
                        <span>Deposit Inr Content</span>
                      </a>
                    </li> */}
                    {/* 
                    <li>
                      exchange
                      <a href={`${config.baseUrl}referralcontent`}>
                        <i className="ti-more" />
                        <span>Referrail Content</span>
                      </a>
                    </li> */}

                    {/* <li>
                      exchange
                      <a href={`${config.baseUrl}kyccontent`}>
                        <i className="ti-more" />
                        <span>Kyc Content</span>
                      </a>
                    </li> */}

                    {/* <li>
                      exchange
                      <a href={`${config.baseUrl}announcements`}>
                        <i className="ti-more" />
                        <span>Announcements</span>
                      </a>
                    </li>

                    <li>
                      exchange
                      <a href={`${config.baseUrl}supportmanagement`}>
                        <i className="ti-more" />
                        <span>Support Management</span>
                      </a>
                    </li>

                    <li>
                      exchange
                      <a href={`${config.baseUrl}depositInr`}>
                        <i className="ti-more" />
                        <span>Deposit INR</span>
                      </a>
                    </li>

                    <li>
                      exchange
                      <a href={`${config.baseUrl}ordertablemanagement`}>
                        <i className="ti-more" />
                        <span>Order Table Management</span>
                      </a>
                    </li>

                    <li>
                      exchange
                      <a href={`${config.baseUrl}pairlist`}>
                        <i className="ti-more" />
                        <span>Pair List</span>
                      </a>
                    </li>

                    <li>
                      exchange
                      <a href={`${config.baseUrl}walletmanagement`}>
                        <i className="ti-more" />
                        <span>Wallet Management</span>
                      </a>
                    </li>

                    <li>
                      exchange
                      <a href={`${config.baseUrl}reportmanagement`}>
                        <i className="ti-more" />
                        <span>Report Management</span>
                      </a>
                    </li> */}






                  </ul>
                </li>

                



                <ul className="treeview-menu">

                </ul>



                {/* <li className={pageUrl.match("/Gallary") ? "active" : ""}>
                  <a href={`${config.baseUrl}Gallary`}>
                    <i data-feather="image" />
                    <span>Gallary</span>
                  </a>
                </li>
                <li className={pageUrl.match("/Category") ? "active" : ""}>
                  <a href={`${config.baseUrl}Category`}>
                    <i data-feather="category" />
                    <span>Category</span>
                  </a>
                </li> */}

                {loginData.role == 1 ? (
                  <li
                    className={pageUrl.match("/changepassword") ? "active" : ""}
                  >
                    <a href={`${config.baseUrl}changepassword`}>
                      <i data-feather="lock" />
                      <span>Change Password</span>
                    </a>
                  </li>
                ) : (
                  ""
                )}
                <li className="">
                  <a href="javascript:;" onClick={logout}>
                    <i data-feather="log-out" />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};
export default Sidebar;
