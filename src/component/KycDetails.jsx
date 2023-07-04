import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  getkycAction,
  updatekycapprovalAction,
  rejectkycapprovalAction,
} from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const KycDetails = () => {
  const [kyclist, setkyclist] = useState({});
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    getpartner();
  }, []);

  const getpartner = async () => {
    let res = await getkycAction();
    if (res) {
      setkyclist(res.data);
      console.log("123", res.data);
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

  // const updatekycRequest = async (id) => {

  //         let res = await updatekycapprovalAction(id);
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

  const updatekycRequest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Approve this Kyc Request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await updatekycapprovalAction(id);
        if (res.success) {
          Swal.fire("Approved!", res.msg, "success");
          setTimeout(() => {
            window.location.href = `${config.baseUrl}kycdetails`;
          }, 2000);
        } else {
          Swal.fire("Failed!", res.msg, "error");
        }
      }
    });
  };

  const rejectkycRequest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Reject this Kyc request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await rejectkycapprovalAction(id);
        if (res.success) {
          Swal.fire("Rejected!", res.msg, "success");
          setTimeout(() => {
            window.location.href = `${config.baseUrl}kycdetails`;
          }, 2000);
        } else {
          Swal.fire("Failed!", res.msg, "error");
        }
      }
    });
  };

  const columns = [
    {
      key: "#",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },
 
    {
      key: "first_name",
      text: "Name",
      cell: (item) => {
        return `${item.first_name}`;
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
        key: "created_at",
        text: "Registration Date ",
        cell: (item) => {
          return `${item.created_at}`;
        },
      },
    {
      key: "action",
      text: "View User Kyc",
      cell: (item) => {
          return (
              <>

              <div class="btn-group mb-5 mt-5">
                  {/* <button type="button" class="waves-effect waves-light btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Action</button>
                  <div class="dropdown-menu" data-popper-placement="top-start" style={{position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(0px, -43px)'}}> */}
                      {/* <a class="dropdown-item" href="javascript:;" onClick={() => loginAsUser(item.email, 'normal')}><i className='fa fa-sign-in'></i> Dashboard Login</a> */}
                      {/* <a class="dropdown-item" href="javascript:;" onClick={() => loginAsUser(item.email, 'business')}><i className='fa fa-sign-in'></i> Business Login</a> */}
                      {/* <a class="button" href={`${config.baseUrl}kycuserdetails/` + item.id} ><i className='fa fa-eye'></i> View User KYC Details</a> */}
                    
                  {/* </div> */}
                  <a class="btn btn-info" href={`${config.baseUrl}kycuserdetails/` + item.id} ><i className='fa fa-eye'></i> View User KYC Details</a>
              </div>
              </>
          );
      }
  },
    
    // {
    //   key: "kyc_document_type",
    //   text: "Identity Document Type",
    //   cell: (item) => {
    //     return `${item.kyc_document_type==0?"Aadhar Card":item.kyc_document_type==1?"Pan Card":item.kyc_document_type==2?"Voter ID":item.kyc_document_type==3?"Driving Licesnse":"not available"}`;
    //   },
    // },
    // {
    //   key: "kyc_document",
    //   text: "Kyc Document Number",
    //   cell: (item) => {
    //     return `${item.kyc_document?item.kyc_document:"not available"}`;
    //   },
    // },
    

    
    // {
    //   key: "kyc_document_image",
    //   text: "Kyc Document Image",
    //   cell: (item) => {
    //     return (
    //       <a target="_blank" href={config.imageUrl + item.kyc_document_image}>
    //         <img
    //           src={`${config.imageUrl + item.kyc_document_image}`}
    //           className="table-img"
    //         />
    //       </a>
    //     );
    //   },
    // },

    // {
    //   key: "kyc_document_type2",
    //   text: "Proof of Address Document Type",
    //   cell: (item) => {
    //     return `${item.kyc_document_type2==0?"Aadhar Card":item.kyc_document_type2==1?"Electricity Bill":item.kyc_document_type2==2?"Voter ID":item.kyc_document_type2==3?"Driving Licesnse":"not available"}`;
    //   },
    // },
    
    // {
    //   key: "kyc_document_image2",
    //   text: "Address Proof Document Image",
    //   cell: (item) => {
    //     return (
    //       <a target="_blank" href={config.imageUrl + item.kyc_document_image2}>
    //         <img
    //           src={`${config.imageUrl + item.kyc_document_image2}`}
    //           className="table-img"
    //         />
    //       </a>
    //     );
    //   },
    // },
    // {
    //   key: "kyc_proof_of_address",
    //   text: "Proof of Address",
    //   cell: (item) => {
    //     return `${item.kyc_proof_of_address?item.kyc_proof_of_address:"not available"}`;
    //   },
    // },
    // {
    //   key: "user_photo",
    //   text: "User Photo",
    //   cell: (item) => {
    //     return (
    //       <a target="_blank" href={config.imageUrl + item.user_photo}>
    //         <img
    //           src={`${config.imageUrl + item.user_photo}`}
    //           className="table-img"
    //         />
    //       </a>
    //     );
    //   },
    // },

    // {
    //   key: "created_at",
    //   text: "Registration Date ",
    //   cell: (item) => {
    //     return `${item.created_at}`;
    //   },
    // },

    // {
    //   key: "action",
    //   text: "Action",
    //   cell: (item) => {
    //     return (
    //       <>
    //         {item.kyc_approval == 0 ? (
    //           <>
    //             <button
    //               onClick={() => updatekycRequest(item)}
    //               type="button"
    //               className="btn btn-sm btn-primary m-2"
    //             >
    //               Approve
    //             </button>

    //             <button
    //               onClick={() => rejectkycRequest(item)}
    //               type="button"
    //               className="btn btn-sm btn-primary"
    //             >
    //               Reject
    //             </button>
    //           </>
    //         ) : item.kyc_approval == 1 ? (
    //           <>
    //             <span style={{ color: "green" }}>Approved</span>
    //           </>
    //         ) : item.kyc_approval == 2 ? (
    //           <>
    //             <span style={{ color: "red" }}>Rejected</span>
    //           </>
    //         ) : (
    //           ""
    //         )}
    //       </>
    //     );
    //   },
    // },
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
                  <h3 className="page-title mb-5 pb-2">Kyc details</h3>
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
                      <h4 className="box-title">Get Kyc Details</h4>
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={kyclist}
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
export default KycDetails;
