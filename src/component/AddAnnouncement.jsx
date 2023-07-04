import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import { insertannouncementAction } from "../Action/action";

const AddAnnouncement = () => {
  const [userDetails, setuserDetails] = useState({
    title: "",
    // file: "",
  
    description: "",
  });
  const [validationError, setvalidationError] = useState({});
  const [image_file, setimage_file] = useState("");
  const [image_preview, setimage_preview] = useState("");
 
  const inputHandler = async (e) => {
    const { name, value } = e.target;
    setuserDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  function validate() {
    let titleError = "";
    let descriptionError = "";
    if (userDetails.title === "") {
      titleError = "Title is required.";
    }
  
    if (userDetails.description === "") {
        descriptionError = "Description is required.";
    }

    if (titleError ||   descriptionError) {
      setvalidationError({
        titleError,
        descriptionError
      });

      return false;
    } else {
      return true;
    }
  }

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

  const insertannouncement = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return false;
    } else {
      let res = await insertannouncementAction(userDetails);
      if (res.success) {
        toast.success(res.msg);
        setTimeout(() => {
          window.location.href = `${config.baseUrl}announcements`;
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
                    Add Announcements
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
                      <h4 className="box-title">Add Announcements</h4>
                    </div>
                    <div className="row">
                    <div className="col-lg-12 p-2">
                    <form onSubmit={insertannouncement}>
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
                        />
                        <span className="validationErr danger">
                          {validationError.titleError}
                        </span>
                      </div>

                  



                     

                     

                      

                   

                     

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                           description
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows={3}
                          placeholder="Enter description "
                          onChange={inputHandler}
                          name="description"
                        />
                        <span className="validationErr danger">
                          {validationError.descriptionError}
                        </span>
                      </div>

                      <div className="mb-3">
                        <button type="submit" class="btn btn-primary pull-right">
                          Submit
                        </button>
                      </div>
                    </form>
                    </div>
                    </div>
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
export default AddAnnouncement;
