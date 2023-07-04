import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import { getcookiepolicyAction, updatecookiepolicyAction } from "../Action/action";
import toast, { Toaster } from "react-hot-toast";
import JoditEditor from "jodit-react";
import config from "../coreFIles/config";

const Cookiepolicy = () => {
  const [cookiepolicy, setcookiepolicy] = useState({});

  useEffect(() => {
    getcookiepolicy();
  }, []);

  const getcookiepolicy = async () => {
    let res = await getcookiepolicyAction();
    if (res) {
      setcookiepolicy(res.data);
    }
  };

  const inputHandler1 = async (e) => {
    setcookiepolicy((old) => {
      return { ...old, description: e };
    });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setcookiepolicy((old) => {
      return { ...old, [name]: value };
    });
  };

  const updatecookiepolicy = async (e) => {
    e.preventDefault();
    let res = await updatecookiepolicyAction(cookiepolicy);
    if (res.success) {
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}cookiepolicy`;
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
                  <h3 className="page-title mb-5 pb-2">Cookie Policy</h3>
                </div>
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}

            {/*Edit Modal */}
            <div>
              <div className="p-2">
                <form onSubmit={updatecookiepolicy}>
                  <div className="modal-body">
                    <div className="container">
                      <div className="mb-3"></div>
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
                        value={cookiepolicy.title}
                      />
                    </div>
                      <JoditEditor
                        onChange={inputHandler1}
                        value={cookiepolicy.description}
                        name="description"
                      />
                      <div className="mt-20">
                        <button
                          type="submit"
                          class="btn btn-primary pull-right"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
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
export default Cookiepolicy;
