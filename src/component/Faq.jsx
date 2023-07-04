import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  deletefaqAction,
  getfaqAction,
  updatefaqAction,
} from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const Faq = () => {
  const [faqlist, setfaqList] = useState({});
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    getpartner();
  }, []);

  const getpartner = async () => {
    let res = await getfaqAction();
    if (res) {
      setfaqList(res.data);
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
      key: "question",
      text: "Question",
      cell: (item) => {
        return `${item.question}`;
      },
    },
    {
      key: "answer",
      text: "Answer",
      cell: (item) => {
        return `${item.answer}`;
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
              onClick={() => deletefaqs(item)}
              className="btn btn-primary"
              name={item.id}
              value={item.id}
            >
              Delete 
            </button>
            &emsp;
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

  const deletefaqs = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this Faq!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deleted it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await deletefaqAction({ id: item.id });
        if (res.success) {
          Swal.fire("Deleted!", res.msg, "success");
          setTimeout(() => {
            window.location.href = `${config.baseUrl}faqs`;
          }, 2000);
        } else {
          Swal.fire("Failed!", res.msg, "error");
        }
      }
    });
  };

  const updateFaqs = async (e) => {
    e.preventDefault();
    let res = await updatefaqAction(userDetails);
    if (res.success) {
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}faqs`;
      }, 2000);
    } else {
      toast.error(res.msg);
    }
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
                    Frequently Asked Questions
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
                      <h4 className="box-title">FAQs </h4>
                      <a
                        href={`${config.baseUrl}addfaqs`}
                        className="btn btn-primary pull-right"
                      >
                        Add 
                      </a>
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={faqlist}
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
                      Edit Faqs
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <form onSubmit={updateFaqs}>
                    <div className="modal-body">
                      <div className="container">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Question
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

                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            Answer
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            onChange={inputHandler}
                            name="answer"
                            value={userDetails.answer}
                          />
                        </div>

                        <div className="modal-footer mt-20">
                          <button type="submit" class="btn btn-primary">
                            submit
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
                      Add Faqs
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <form onSubmit={updateFaqs}>
                    <div className="modal-body">
                      <div className="container">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Question
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

                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            Answer
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            onChange={inputHandler}
                            name="answer"
                            value={userDetails.answer}
                          />
                        </div>

                        <div className="modal-footer mt-20">
                          <button type="submit" class="btn btn-primary">
                            submit new
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
export default Faq;
