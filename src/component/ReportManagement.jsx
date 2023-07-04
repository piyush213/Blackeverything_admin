import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  transactiontypeAction,
  transactionfilterAction,
  orderfilterAction,
  //   approvegetordersAction,
  //   rejectgetordersAction,
} from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { JSONToCSVConvertor } from "../directives/jsontocsv";

const ReportManagement = () => {
  const [data, setdata] = useState({
    trx_type: "",
  });
  const [userDetails, setuserDetails] = useState({});
  const [total_records, settotal_records] = useState("");
  const [transactionlist, settransactionlist] = useState([]);

  const [orderdata, setorderdata] = useState({
    order_type: "",
    from_date1:"",
    to_date1:""
  });
  const [total_records_order, settotal_records_order] = useState("");
  const [orderlist, setorderlist] = useState([]);

  useEffect(() => {
    getpartner();
    transactionfiltered("");
    orderResult("")
  }, []);

  const getpartner = async () => {
    let res = await transactiontypeAction();
    if (res) {
      setuserDetails(res.data);
      console.log("setgetordersList", res.data);
    }
  };

  const transactionfiltered = async () => {
    // e.preventDefault();
    let res = await transactionfilterAction(data);
    console.log("userDetails", data);
    if (res.success) {
      console.log(
        "transactionfiltered",
        res.response,
        "total records",
        res.response1
      );
      settotal_records(res.response1);
      settransactionlist(res.response);
      // toast.success(res.msg);
      //   setTimeout(() => {
      //     window.location.href = `${config.baseUrl}Announcements`;
      //   }, 2000);
    } else {
      toast.error(res.msg);
      settotal_records(0);

    }
  };

  const orderResult = async () => {
    // e.preventDefault();
    let res = await orderfilterAction(orderdata);
    console.log("userDetails", res);
    if (res.success) {
      console.log(
        "transactionfiltered",
        res.response,
        "total records",
        res.response1
      );
      settotal_records_order(res.response1);
      setorderlist(res.response);
      // toast.success(res.msg);
      //   setTimeout(() => {
      //     window.location.href = `${config.baseUrl}Announcements`;
      //   }, 2000);
    } 
    // else if (res.success.false){
    //   settotal_records_order("0")
    // }
    else {
      toast.error(res.msg);
      console.log("error",res.msg);
      settotal_records_order("0")

    }
  };

  const downloadTransactionCsv = () => {
    JSONToCSVConvertor(transactionlist, "Transactions List", true);
  };

  const downloadCsv = () => {
    JSONToCSVConvertor(orderlist, "Orders List", true);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setdata((old) => {
      return { ...old, [name]: value };
    });
  };

  // const inputHandler1 = (e) => {
    // const { name, value } = e.target;
    // setorderdata({ ...old, order_type:value});
    // console.log("inputhnadler1",orderdata.order_type);
    // setorderdata((old) => {
    //   return { ...old, {  order_type:value} };
    // });
  // };

  const inputHandler1 = async (e) => {
    setorderdata((old) => {
      return { ...old, order_type: e };
    });
  };

  const inputHandler2 = async (e) => {
    setorderdata((old) => {
      return { ...old, from_date1: e };
    });
  };

  const inputHandler3 = async (e) => {
    setorderdata((old) => {
      return { ...old, to_date1: e };
    });
  };

  const inputHandler4 = (e) => {
    const { name, value } = e.target;
    setorderdata((old) => {
      return { ...old, [name]: value };
    });
  };

  // const inputHandler2 = (e) => {
  //   const { name, value } = e.target;
  //   setorderdata({from_date1:value});
  //   console.log("inputhnadler1",orderdata.order_type);
  // };

  // const inputHandler3 = (e) => {
  //   const { name, value } = e.target;
  //   setorderdata({to_date1:value});
  //   console.log("inputhnadler1",orderdata.order_type);
  // };
  

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
                  <h3 className="page-title mb-5 pb-2">Report Management</h3>
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
                      <h4 className="box-title"> Report Management</h4>
                    </div>
                    <div className="box-body">
                      {/* <!-- Page body start --> */}
                      <div className="page-body">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="card">
                              <div className="card-header">
                                <h5>Transaction Report</h5>
                              </div>
                              <div className="card-block">
                                <div className="row">
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>From Date</label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        onChange={inputHandler}
                                        value={data.from_date}
                                        name="from_date"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>To Date</label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        onChange={inputHandler}
                                        value={data.to_date}
                                        name="to_date"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>Type</label>
                                      <select
                                        className="form-control"
                                        onChange={inputHandler}
                                        name="trx_type"
                                        value={data.trx_type}
                                      >
                                        <option selected="selected" value="">
                                          Select Type
                                        </option>

                                        <option value={3}>Deposit</option>
                                        <option value={4}>Withdraw</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>Total Records</label>
                                      <input
                                        type="text"
                                        value={total_records}
                                        disabled
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-1">
                                    <button
                                      type="button"
                                      onClick={transactionfiltered}
                                      className="btn btn-primary"
                                    >
                                      Search
                                    </button>
                                  </div>

                                  <div className="col-md-8">
                                    {total_records > 0 ? (
                                      <>
                                        <a download className="ml-5">
                                          <button
                                            type="button"
                                            onClick={downloadTransactionCsv}
                                            className="btn btn-primary"
                                          >
                                            CSV
                                          </button>
                                        </a>
                                        &emsp;
                                        <a download className="ml-5">
                                          <button
                                            type="button"
                                            onClick={downloadTransactionCsv}
                                            className="btn btn-primary"
                                          >
                                            Excel
                                          </button>
                                        </a>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Page body end --> */}

                      {/* Order Page  */}
                      <div className="page-body">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="card">
                              <div className="card-header">
                                <h5>Order Report</h5>
                                {/* <!--<span>Add class of <code>.form-control</code> with <code>&lt;input&gt;</code> tag</span>--> */}
                              </div>
                              <div className="card-block">
                                <div className="row">
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>From Date</label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        onChange={inputHandler4}
                                        value={orderdata.from_date1}
                                        name="from_date1"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>To Date</label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        onChange={inputHandler4}
                                        value={orderdata.to_date1}
                                        name="to_date1"
                                      />
                                    </div>
                                  </div>

                                  {/* <div className="col-md-3">
                                    <div className="form-group">
                                      <label>Type</label>
                                      <select
                                        className="form-control"
                                        onChange={inputHandler1}
                                        value={orderdata.order_type}
                                        name="order_type"
                                      >
                                        <option value="BUY" selected="selected">
                                          BUY
                                        </option>
                                        <option value="SELL">SELL</option>
                                      </select>
                                    </div>
                                  </div> */}

                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>Type</label>
                                      <select
                                        className="form-control"
                                        onChange={inputHandler4}
                                        name="order_type"
                                        value={orderdata.order_type}
                                      >
                                        <option value="" selected="selected">
                                          Select
                                        </option>
                                        <option value="BUY">BUY</option>
                                        <option value="SELL">SELL</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <label>Total Records</label>
                                      <input
                                        type="text"
                                        value={total_records_order}
                                        disabled
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-1">
                                    <button
                                      type="button"
                                      onClick={orderResult}
                                      className="btn btn-primary"
                                    >
                                      Search
                                    </button>
                                  </div>

                                  <div className="col-md-8">
                                    {total_records_order > 0 ? (
                                      <>
                                        <a className="ml-5">
                                          <button
                                            type="button"
                                            onClick={downloadCsv}
                                            className="btn btn-primary"
                                          >
                                            CSV
                                          </button>
                                        </a>

                                        <a download className="ml-5">
                                          <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={downloadCsv}
                                          >
                                            Excel
                                          </button>
                                        </a>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {order page end} */}
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
export default ReportManagement;
