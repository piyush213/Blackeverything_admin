import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import {
  getAboutusAction,
  updateAboutusAction,
} from "../Action/action";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import Cookies from "js-cookie";

const AboutUs = () => {
  const [aboutus, setaboutus] = useState({});

  useEffect(() => {
    getaboutus();
  }, []);

  const getaboutus = async () => {
    let res = await getAboutusAction();
    if (res) {
      setaboutus(res.data);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setaboutus((old) => {
      return { ...old, [name]: value };
    });
  };

  const updateaboutus = async (e) => {
    e.preventDefault();
    let res = await updateAboutusAction(aboutus);
    if (res.success) {
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}aboutus`;
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
                  <h3 className="page-title mb-5 pb-2">About Us</h3>
                </div>
                
            {/* <div>{mask}</div> */}
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}

            {/*Edit Modal */}
            <div>
             <div className="p-2">
              <form
                onSubmit={updateaboutus}
              >
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
                        onChange={inputHandler}
                        name="title"
                        value={aboutus.title}
                      />
                    </div>
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
                        rows={5}
                        onChange={inputHandler}
                        name="description"
                        value={aboutus.description}
                      />
                    </div>
                    <div className=" mx-10  mt-20">
                      <button type="submit" class="btn btn-primary mx-20 pull-right">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form></div>
            </div>
            {/*Edit Modal Ends */}
            {/* /.content */}
          
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default AboutUs;
