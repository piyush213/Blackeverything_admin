import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  getordersAction,
//   approvegetordersAction,
//   rejectgetordersAction,
} from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const OrderTableManagement = () => {
  const [getorderslist, setgetordersList] = useState({});
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    getpartner();
    
  }, []);

  const getpartner = async () => {
    let res = await getordersAction();
    if (res) {
      setgetordersList(res.data);
      console.log("setgetordersList", res.data);
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

  // const updatebuyRequest = async (id) => {

  //         let res = await approvegetordersAction(id);
  //         if (res.success) {
  //             getpartner();
  //              Swal.fire(
  //                 'Updated',
  //                 res.msg,
  //                 'success'
  //               )
  //         } else {
  //             Swal.fire(
  //                 'Failed!',
  //                 res.msg,
  //                 'error'
  //             )
  //         }
  //     }

//   const updatebuyRequest = async (id) => {
//     console.log("updatebuyRequest",id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to Approve this Transaction!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Approve it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         let res = await approvegetordersAction(id);
//         console.log("123456",id);
//         if (res.success) {
//           Swal.fire("Approved!", res.msg, "success");
//         //   setTimeout(() => {
//         //     window.location.href = `${config.baseUrl}depositInr`;
//         //   }, 2000);
//         } else {
//           Swal.fire("Failed!", res.msg, "error");
//         }
//       }
//     });
//   };

//   const rejectbuyRequest = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to Reject this Transaction!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Reject it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         let res = await rejectgetordersAction(id);
//         if (res.success) {
//           Swal.fire("Rejected!", res.msg, "success");
//         //   setTimeout(() => {
//         //     window.location.href = `${config.baseUrl}depositInr`;
//         //   }, 2000);
//         } else {
//           Swal.fire("Failed!", res.msg, "error");
//         }
//       }
//     });
//   };

  const columns = [
    {
      key: "#",
      text: "Sno.",
      cell: (row, index) => index + 1, 
      
    },
    {
      key: "pair",
      text: "Pair",
      cell: (item) => {
        return `${item.pair}`;
      },
    },
    {
      key: "email",
      text: "Email Address",
      cell: (item) => {
        return `${item.email}`;
      },
    },
    {
        key: "order_type",
        text: "Order Type ",
        cell: (item) => {
          return `${item.order_type}`;
        },
      },
    {
      key: "amount",
      text: "Amount",
      cell: (item) => {
        return `${item.amount}`;
      },
    },
    

    {
      key: "fee_amount",
      text: "Fee",
      cell: (item) => {
        return `${item.fee_amount}`;
      },
    },

    {
        key: "amount",
        text: "Total Amount",
        cell: (item) => {
          return `${item.amount}`;
        },
      },
    
    {
      key: "remaining_amount",
      text: "Remaining Amount",
      cell: (item) => {
        return `${item.remaining_amount}`;
      },
    },

     {
      key: "price",
      text: "Price",
      cell: (item) => {
        return `${item.price}`;
      },
    },

    {
        key: "status",
        text: "Status",
        cell: (item) => {
            return (
                <>
                    {(item.status === 0) ? 'Open' :
                        (item.status === 1) ? 'Completed' :
                            (item.status === 2) ? 'Cancelled'

                                : ""}


                </>
            );
        }
    },

    {
        key: "datetime",
        text: "Date",
        cell: (item) => {
            return (
                item.datetime.slice(0, 10)
            );
        }
    },

 
   
    
    
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
                  <h3 className="page-title mb-5 pb-2">Order Table Management</h3>
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
                      <h4 className="box-title"> Order Table Management</h4>
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={getorderslist}
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
export default OrderTableManagement;
