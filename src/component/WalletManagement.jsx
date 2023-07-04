import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  admincoinlistAction, updatecoinbyidAction
  //   approvegetordersAction,
  //   rejectgetordersAction,
} from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const WalletManagement = () => {
  const [getorderslist, setgetordersList] = useState({});
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    getpartner();
  }, []);

  const updatecoinbyid = async (e) => {
    e.preventDefault();
    let res = await updatecoinbyidAction(userDetails);
    if (res.success) {
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}walletmanagement`;
      }, 2000);
    } else {
      toast.error(res.msg);
    }
  };

  const getpartner = async () => {
    let res = await admincoinlistAction();
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
    console.log(item, "item");
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
      key: "icon",
      text: "Coin Name",
      cell: (item) => {
        return (
          <>
            <p>
              {item.name} &emsp;{" "}
              <img
                src={`${config.imageUrl1}${item.icon}`}
                style={{ width: "30px" }}
              />
            </p>
          </>
        );
      },
    },
    {
      key: "symbol",
      text: "Symbol ",
      cell: (item) => {
        return `${item.symbol}`;
      },
    },
    {
      key: "deposit_fee",
      text: "Deposit Fees",
      cell: (item) => {
        return `${item.deposit_fee}`;
      },
    },
    {
      key: "withdraw_fee",
      text: "Withdraw fee",
      cell: (item) => {
        return `${item.withdraw_fee}`;
      },
    },

    {
      key: "status",
      text: "Status",
      cell: (item) => {
        return (
          <>
            <button
              type="button"
              onClick={() => editPartner(item)}
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              name={item.id}
              value={item.id}
            >
              Edit
            </button>
          </>
        );
      },
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
                  <h3 className="page-title mb-5 pb-2">
                    Wallet Management
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
                      <h4 className="box-title"> Wallet Management</h4>
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
              {/*Edit Modal */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Edit
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <form
                      onSubmit={updatecoinbyid}
                    >
                      <div className="modal-body">
                        <div className="container">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Trade Fee
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Trade Fee"
                              onChange={inputHandler}
                              name="trade_fee"
                              value={userDetails.trade_fee}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Withdraw Fee
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Withdraw Fee"
                              onChange={inputHandler}
                              name="withdraw_fee"
                              value={userDetails.withdraw_fee}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Deposit Fee
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Deposit Fee"
                              onChange={inputHandler}
                              name="deposit_fee"
                              value={userDetails.deposit_fee}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Opening Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Deposit Fee"
                              onChange={inputHandler}
                              name="opening_date"
                              value={userDetails.opening_date}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Minimum Trade Fee
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Withdraw Fee"
                              onChange={inputHandler}
                              name="minimum_trade_limit"
                              value={userDetails.minimum_trade_limit}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Maximum Trade Fee
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter Withdraw Fee"
                              onChange={inputHandler}
                              name="maximum_trade_limit"
                              value={userDetails.maximum_trade_limit}
                            />
                          </div>


                        

                          <div className="modal-footer mt-20">
                            <button type="submit" class="btn btn-primary">
                              Submit
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/*Edit Modal Ends */}
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
export default WalletManagement;
