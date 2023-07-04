import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import {
 
  getcontactusAction,
 
} from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const Contactus = () => {
  const [contactuslist, setcontactusList] = useState({});
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    getpartner();
  }, []);

  const getpartner = async () => {
    let res = await getcontactusAction();
    if (res) {
      setcontactusList(res.data);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setuserDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  function editPartner(item) {
    setuserDetails(item);
  }

  const columns = [
    {
      key: "#",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },
    {
      key: "name",
      text: "Name",
      cell: (item) => {
        return `${item.name}`;
      },
    },
    {
      key: "email",
      text: "Email",
      cell: (item) => {
        return `${item.email}`;
      },
    },
    {
        key: "phone",
        text: "Phone",
        cell: (item) => {
          return `${item.phone}`;
        },
      },
      {
        key: "subject",
        text: "Subject",
        cell: (item) => {
          return `${item.subject}`;
        },
      },
      {
        key: "message",
        text: "Message",
        cell: (item) => {
          return `${item.message}`;
        },
      }
  ];

  const configForTable = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    pagination: "advance",
    button: {
      excel: true,
      print: false,
    },
  };

 

  return (
    <>
      <div class="wrapper">
        <Toaster />

        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">
                    Contact Us Details
                  </h3>
                </div>
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}
            <section className="content">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h4 className="box-title">Contact Us</h4>
                      {/* <a
                        href={`${config.baseUrl}addcontactuss`}
                        className="btn btn-primary pull-right"
                      >
                        Add 
                      </a> */}
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={contactuslist}
                        columns={columns}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
           

            {/* /.content */}
            {/* /.content */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default Contactus;
