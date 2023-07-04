import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  showuserkycAction,
  updatekycapprovalAction,
  rejectkycapprovalAction,
} from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
const KycUserDetails = () => {
  const [kyclist, setkyclist] = useState({});
  const [userDetails, setuserDetails] = useState({});
  const [image_file, setimage_file] = useState("");
  const [image_preview, setimage_preview] = useState("");
  const [image_file2, setimage_file2] = useState("");
  const [image_preview2, setimage_preview2] = useState("");
  const [image_file3, setimage_file3] = useState("");
  const [image_preview3, setimage_preview3] = useState("");
  useEffect(() => {
    getpartner();
  }, []);

  const getpartner = async () => {
    const id = window.location.href.split("/").pop();
    let res = await showuserkycAction({ id: id });
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
            const id = window.location.href.split("/").pop();

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
      key: "kyc_document_type",
      text: "Identity Document Type",
      cell: (item) => {
        return `${
          item.kyc_document_type == 0
            ? "Aadhar Card"
            : item.kyc_document_type == 1
            ? "Pan Card"
            : item.kyc_document_type == 2
            ? "Voter ID"
            : item.kyc_document_type == 3
            ? "Driving Licesnse"
            : "not available"
        }`;
      },
    },
    {
      key: "kyc_document",
      text: "Kyc Document Number",
      cell: (item) => {
        return `${item.kyc_document ? item.kyc_document : "not available"}`;
      },
    },

    {
      key: "kyc_document_image",
      text: "Kyc Document Image",
      cell: (item) => {
        return (
          <a target="_blank" href={config.imageUrl + item.kyc_document_image}>
            <img
              src={`${config.imageUrl + item.kyc_document_image}`}
              className="table-img"
            />
          </a>
        );
      },
    },

    {
      key: "kyc_document_type2",
      text: "Proof of Address Document Type",
      cell: (item) => {
        return `${
          item.kyc_document_type2 == 0
            ? "Aadhar Card"
            : item.kyc_document_type2 == 1
            ? "Electricity Bill"
            : item.kyc_document_type2 == 2
            ? "Voter ID"
            : item.kyc_document_type2 == 3
            ? "Driving Licesnse"
            : "not available"
        }`;
      },
    },

    {
      key: "kyc_document_image2",
      text: "Address Proof Document Image",
      cell: (item) => {
        return (
          <a target="_blank" href={config.imageUrl + item.kyc_document_image2}>
            <img
              src={`${config.imageUrl + item.kyc_document_image2}`}
              className="table-img"
            />
          </a>
        );
      },
    },
    {
      key: "kyc_proof_of_address",
      text: "Proof of Address",
      cell: (item) => {
        return `${
          item.kyc_proof_of_address
            ? item.kyc_proof_of_address
            : "not available"
        }`;
      },
    },
    {
      key: "user_photo",
      text: "User Photo",
      cell: (item) => {
        return (
          <a target="_blank" href={config.imageUrl + item.user_photo}>
            <img
              src={`${config.imageUrl + item.user_photo}`}
              className="table-img"
            />
          </a>
        );
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
      text: "Action",
      cell: (item) => {
        return (
          <>
            {item.kyc_approval == 0 ? (
              <>
                <button
                  onClick={() => updatekycRequest(item)}
                  type="button"
                  className="btn btn-sm btn-primary m-2"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectkycRequest(item)}
                  type="button"
                  className="btn btn-sm btn-primary"
                >
                  Reject
                </button>
              </>
            ) : item.kyc_approval == 1 ? (
              <>
                <span style={{ color: "green" }}>Approved</span>
              </>
            ) : item.kyc_approval == 2 ? (
              <>
                <span style={{ color: "red" }}>Rejected</span>
              </>
            ) : (
              ""
            )}
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
          <div className="col-md-6 col-12 container-full mx-auto ">
            {/* Main content */}
            <div className="content-header">
              <div className="kycback">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2" >Kyc details</h3>
                  <a className="page-title btn btn-info pull-right" id="backbtnid" href={`${config.baseUrl}kycdetails`}>Back</a>

                </div>
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}
            {/* <section className="content">
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
            </section> */}

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={kyclist?.first_name}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date Of Birth</label>
              <input
                type="text"
                className="form-control"
                value={kyclist?.date_of_birth}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={kyclist?.email}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">KYC Document Type </label>
              <input
                type="text"
                className="form-control"
                value={
                  kyclist.kyc_document_type == 0
                    ? "Aadhar Card"
                    : kyclist.kyc_document_type == 1
                    ? "Pan Card"
                    : kyclist.kyc_document_type == 2
                    ? "Voter ID"
                    : kyclist.kyc_document_type == 3
                    ? "Driving Licesnse"
                    : "not available"
                }
              />
            </div>

            <div className="mb-3 text-center">
            <a
                target="_blank"
                href={config.imageUrl + kyclist.kyc_document_image}
              >
                <img
                  src={`${config.imageUrl + kyclist.kyc_document_image}`}
                  className="table-img"
                />
              </a>
            </div>

            <div className="mb-3 ">
              <label className="form-label">Document Number</label>
              <input
                type="text"
                className="form-control"
                value={kyclist?.kyc_document}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                KYC Document Type For Address{" "}
              </label>
              <input
                type="text"
                className="form-control"
                value={
                  kyclist.kyc_document_type2 == 0
                    ? "Aadhar Card"
                    : kyclist.kyc_document_type2 == 1
                    ? "Pan Card"
                    : kyclist.kyc_document_type2 == 2
                    ? "Voter ID"
                    : kyclist.kyc_document_type2 == 3
                    ? "Driving Licesnse"
                    : "not available"
                }
              />
            </div>

            <div className="mb-3 text-center">
            <a
                target="_blank"
                href={config.imageUrl + kyclist.kyc_document_image2}
              >
                <img
                  src={`${config.imageUrl + kyclist.kyc_document_image2}`}
                  className="table-img"
                />
              </a>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Address Proof Document Number
              </label>
              <input
                type="text"
                className="form-control"
                value={kyclist?.kyc_document2}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Full Address</label>
              <input
                type="text"
                className="form-control"
                value={kyclist?.kyc_proof_of_address}
              />
            </div>

            <div className="mb-3 text-center">
              <a
                target="_blank"
                href={config.imageUrl + kyclist.user_photo}
              >
                <img
                  src={`${config.imageUrl + kyclist.user_photo}`}
                  className="table-img"
                />
              </a>
            </div>

            {kyclist?.kyc_approval == 0 ? (
              <>
                <button
                  onClick={() => updatekycRequest(kyclist)}
                  type="button"
                  className="btn btn-sm btn-primary m-2"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectkycRequest(kyclist)}
                  type="button"
                  className="btn btn-sm btn-primary"
                >
                  Reject
                </button>
              </>
            ) : kyclist?.kyc_approval == 1 ? (
              <>
                <span style={{ color: "green" }}>KYC Approved</span>
              </>
            ) : kyclist?.kyc_approval == 2 ? (
              <>
                <span style={{ color: "red" }}>KYC Rejected</span>
              </>
            ) : (
              ""
            )}

            {/* /.content */}
            {/* /.content */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default KycUserDetails;
