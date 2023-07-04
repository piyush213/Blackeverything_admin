import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import { insertfaqAction } from "../Action/action";

const AddFaq = () => {
  const [userDetails, setuserDetails] = useState({
    question: "",
    answer: ""
  });
  const [validationError, setvalidationError] = useState({});

  const inputHandler = async (e) => {
    const { name, value } = e.target;
    setuserDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  function validate() {
    let questionError = "";
    let answerError = "";

    if (userDetails.question === "") {
      questionError = "Title is required.";
    }
    if (userDetails.answer === "") {
      answerError = "Description is required.";
    }

    if (questionError || answerError) {
      setvalidationError({
        questionError,
        answerError,
      });

      return false;
    } else {
      return true;
    }
  }

  const insertfaq = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return false;
    } else {
      let res = await insertfaqAction(userDetails);
      if (res.success) {
        toast.success(res.msg);
        setTimeout(() => {
          window.location.href = `${config.baseUrl}faqs`;
        }, 1200);
      } else {
        toast.error(res.msg);
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        {/* <div id="loader"></div> */}
        <Header />
        <Toaster />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">
                    Add Frequently Asked Questions 
                  </h3>
                </div>
              </div>
              <hr />
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}
            <section className="content">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h4 className="box-title">Add Faqs</h4>
                    </div>
                    <div className= "p-2">
                    <form onSubmit={insertfaq}>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter Question
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter question"
                          onChange={inputHandler}
                          name="question"
                        />
                        <span className="validationErr danger">
                          {validationError.questionError}
                        </span>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Enter Answer
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows={3}
                          placeholder="Enter answer "
                          onChange={inputHandler}
                          name="answer"
                        />
                        <span className="validationErr danger">
                          {validationError.answerError}
                        </span>
                      </div>

                      <div className="mb-3">
                        <button type="submit" class="btn btn-primary pull-right">
                          Submit
                        </button>
                      </div>
                    </form></div>
                  </div>
                </div>
              </div>
            </section>
            {/* /.content */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default AddFaq;
