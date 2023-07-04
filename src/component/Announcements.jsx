import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  deleteannouncementAction,
  announcementAction,
  updateannouncementAction,
  activeannouncementAction,
  inactiveannouncementAction,
} from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import ShowMoreText from "react-show-more-text";
import ReactReadMoreReadLess from "react-read-more-read-less";

const Announcements = () => {
  const [Announcements, setAnnouncements] = useState({});
  const [userDetails, setuserDetails] = useState({});
  const [image_file, setimage_file] = useState("");
  const [image_preview, setimage_preview] = useState("");
const executeOnClick=(isExpanded) => {
  console.log(isExpanded);
}
  useEffect(() => {
    getpartner();
  }, []);

  const getpartner = async () => {
    let res = await announcementAction();
    if (res) {
      setAnnouncements(res.data);
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
      key: "title",
      text: "Title",
      cell: (item) => {
        return `${item.title}`;
      },
    },
    {
      key: "description",
      text: "Description",
      style :{"white-space": "break-spaces"},

      // width : "300px",
      cell: (item) => {
        return (
          // <ShowMoreText
          //       /* Default options */
          //       lines={2}
          //       more="more"
          //       less="less"
          //       className="content-css"
          //       anchorClass="my-anchor-css-class"
          //       onClick={executeOnClick}
          //       expanded={false}
          //       width={100}
          //       truncatedEndingComponent={"... "}
          //   >
          //     <p className="description">{item.description}</p>
          //     </ShowMoreText>
          <ReactReadMoreReadLess
          width = {100}
            charLimit={10}
            readMoreText={"Read more ▼"}
            readLessText={"Read less ▲"}
            // style = {{whiteSpace: "break-spaces"}}
            readMoreStyle = {{whiteSpace: "break-spaces !important", textDecoration: "none"}}
>
            {item.description}

           {/* <p className="description">{item.description}</p>   */}
          </ReactReadMoreReadLess>
        );
      },
    },

    {
      key: "datetime",
      text: "Datetime",
      cell: (item) => {
        return `${item.datetime}`;
      },
    },
    {
      key: "status",
      text: "status",
      cell: (item) => {
        return `${item.status == "0" ? "Active" : "Deactive"}`;
      },
    },
    {
      key: "action",
      text: "Action",
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
            &emsp;
            <button
              type="button"
              onClick={() => deleteAnnouncements(item)}
              className="btn btn-primary"
              name={item.id}
              value={item.id}
            >
              Delete
            </button>
            &emsp;
            {item.status == 0 ? (
              <button
                type="button"
                onClick={() => inactiveAnnouncements(item)}
                className="btn btn-primary"
                name={item.id}
                value={item.id}
              >
                InActive
              </button>
            ) : (
              <button
                type="button"
                onClick={() => activeAnnouncements(item)}
                className="btn btn-primary"
                name={item.id}
                value={item.id}
              >
                Active
              </button>
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
    columns: 3,
    button: {
      excel: true,
      print: false,
    },
  };

  const deleteAnnouncements = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deleted it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await deleteannouncementAction({ id: item.id });
        if (res.success) {
          Swal.fire("Deleted!", res.msg, "success");
          setTimeout(() => {
            window.location.href = `${config.baseUrl}announcements`;
          }, 2000);
        } else {
          Swal.fire("Failed!", res.msg, "error");
        }
      }
    });
  };

  const inactiveAnnouncements = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to In Active this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, In Active it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await inactiveannouncementAction({ id: item.id });
        if (res.success) {
          Swal.fire("InActive!", res.msg, "success");
          setTimeout(() => {
            window.location.href = `${config.baseUrl}announcements`;
          }, 2000);
        } else {
          Swal.fire("Failed!", res.msg, "error");
        }
      }
    });
  };

  const activeAnnouncements = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Active this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Active it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await activeannouncementAction({ id: item.id });
        if (res.success) {
          Swal.fire("Active!", res.msg, "success");
          setTimeout(() => {
            window.location.href = `${config.baseUrl}announcements`;
          }, 2000);
        } else {
          Swal.fire("Failed!", res.msg, "error");
        }
      }
    });
  };

  const updateAnnouncements = async (e) => {
    e.preventDefault();
    let res = await updateannouncementAction(userDetails);
    if (res.success) {
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}Announcements`;
      }, 2000);
    } else {
      toast.error(res.msg);
    }
  };

  const partnerPic = async (e) => {
    e.preventDefault();
    let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    let image_as_files = e.target.files[0];
    setimage_file(image_as_files);
    setimage_preview(image_as_base64);
    setuserDetails((old) => {
      return { ...old, ["file"]: image_as_files };
    });
  };

  return (
    <>
      <div class="wrapper">
        {/* <div id="loader"></div> */}
        <Toaster />
        <ReactTooltip html={true} delayHide={1000} />
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Announcements</h3>
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
                      <h4 className="box-title">Announcements</h4>
                      <a
                        href={`${config.baseUrl}addannouncement`}
                        className="btn btn-primary pull-right"
                      >
                        Add Announcement
                      </a>
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={Announcements}
                        columns={columns}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
                  <form onSubmit={updateAnnouncements}>
                    <div className="modal-body">
                      <div className="container">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter Title"
                            onChange={inputHandler}
                            name="title"
                            value={userDetails.title}
                          />
                        </div>

                        {/* <div className="mb-3">
                          {image_preview == "" ? (
                            userDetails?.file === null ||
                            userDetails?.file === "null" ||
                            userDetails?.file == "" ? (
                              <img
                                style={{ height: "150px", width: "150px" }}
                                className="object-cover w-full h-32"
                                src=""
                                alt=""
                              />
                            ) : (
                              <img
                                style={{ height: "150px", width: "150px" }}
                                className="object-cover w-full h-32"
                                src={`${config.imageUrl}${userDetails?.file}`}
                                alt=""
                              />
                            )
                          ) : (
                            <img
                              style={{ height: "150px", width: "150px" }}
                              id="image"
                              className="object-cover w-full h-32"
                              src={image_preview}
                            />
                          )}
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            file
                          </label>

                          <input
                            name="file"
                            onChange={partnerPic}
                            id="fileInput"
                            accept="image/*"
                            className="form-control mt-5"
                            type="file"
                          />
                        </div> */}

                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            onChange={inputHandler}
                            name="description"
                            value={userDetails.description}
                            placeholder="Description"
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

            {/*Add Modal 1*/}
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
                    <h5 className="modal-title" id="exampleModal1">
                      Add
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <form onSubmit={updateAnnouncements}>
                    <div className="modal-body">
                      <div className="container">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter Title"
                            onChange={inputHandler}
                            name="question"
                            value={userDetails.question}
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
            {/*Add Modal Ends */}

            {/* /.content */}
            {/* /.content */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default Announcements;
