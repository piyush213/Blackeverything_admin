import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import {
    adminpairlistAction,activeDeactivecoinPairsAction
//   approvegetordersAction,
//   rejectgetordersAction,
} from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const PairList = () => {
  const [adminpairlist, setadminpairlist] = useState({});
  const [userDetails, setuserDetails] = useState({});
  const [symbol, setsymbol] = useState({});

  useEffect(() => {
    getpartner();
    
  }, []);

  const getpartner = async () => {
    let res = await adminpairlistAction();
    if (res) {
      setadminpairlist(res.data);
      console.log("setadminpairlist", res.data);
    }
  };

  const activeDeactive = async (item) => {
    console.log("activeDeactiveitem",item);
    let res = await activeDeactivecoinPairsAction(item);
    if (res.success) {
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}pairlist`;
      }, 2000);
    } else {
      toast.error(res.msg);
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

//   const activeDeactive = async (id) => {
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
//         let res = await activeDeactivecoinPairsAction(id);
//         console.log("123456",id);
//         if (res.success) {
//           Swal.fire("Approved!", res.msg, "success");
//           setTimeout(() => {
//             window.location.href = `${config.baseUrl}depositInr`;
//           }, 2000);
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
      key: "left_symbol",
      text: "Left Symbol",
      cell: (item) => {
        return `${item.left_symbol}`;
      },
    },
    {
        key: "right_symbol",
        text: "Right Symbol",
        cell: (item) => {
          return `${item.right_symbol}`;
        },
      },
   
      
      {
        key: "Action",
        text: "Action and      Status",
        cell: (item, index) => {
            return (
                <>
                    <button
                        className={`${item.is_active == 1 ? 'btn btn-danger btn-sm' : "btn btn-success btn-sm"}`}
                        // onClick={activeDeactive(item)}
                        onClick={() => activeDeactive(item)}
                        style={{ marginRight: '5px' }}>
                        {item.is_active == 1 ? 'De-Active' : "Active"}
                    </button>
                    <label>{item.is_active == 1 ? 'Activated' : "De-activated"}</label>

                </>
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
                  <h3 className="page-title mb-5 pb-2">Pair List</h3>
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
                      <h4 className="box-title"> Pair List</h4>
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={adminpairlist}
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
export default PairList;
