import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import {
  insertarticlecategoryAction,
  getarticlecategorylistAction,
} from "../Action/action";

const Addarticlecategory = () => {
  const [form, setForm] = useState({ article_name: "" });
  const [validatioError, setvalidatioError] = useState({});

  const inputHandler = async (e) => {
    const { name, value } = e.target;
    setForm((old) => {
      return { ...old, [name]: value };
    });
  };

  function validate() {
    let article_nameError = "";
    if (form.article_nameError === "") {
      article_nameError = " Article Category is required.";
    }

    if (article_nameError) {
      setvalidatioError({
        article_nameError,
      });
      return false;
    } else {
      return true;
    }
  }
  const insertarticlecategory = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
    } else {
      let res = await insertarticlecategoryAction(form);
      if (res.success) {
        toast.success(res.msg);
        setTimeout(() => {
          window.location.href = `${config.baseUrl}Articlecategory`;
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
                  <h3 className="page-title mb-5 pb-2">Article Category</h3>
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
                      <h4 className="box-title">Add Article Category</h4>
                    </div>
                    <div className="row mt-20 mb-50">
                      <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                          <div className="form-group row mb-1">
                            <label className="col-form-label col-md-12">
                              Article Category
                            </label>
                            <div className="col-md-12">
                              <input
                                className="form-control"
                                type="text"
                                name="article_name"
                                value={form.category_name}
                                onChange={inputHandler}
                                placeholder="Article Name"
                              />
                            </div>
                            <span className="validationErr">
                              {validatioError.article_nameError}
                            </span>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={insertarticlecategory}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                        <div className="col-md-2"></div>
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
export default Addarticlecategory;
