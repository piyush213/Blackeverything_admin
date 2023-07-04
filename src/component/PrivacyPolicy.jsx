import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import { getprivacypolicyAction, updateprivacypolicyAction } from "../Action/action";
import toast, { Toaster } from "react-hot-toast";
import JoditEditor from "jodit-react";
import config from "../coreFIles/config";

const Privacypolicy = () => {
  const [privacypolicy, setprivacypolicy] = useState({});

  useEffect(() => {
    getprivacypolicy();
  }, []);

  const getprivacypolicy = async () => {
    let res = await getprivacypolicyAction();
    if (res) {
      setprivacypolicy(res.data);
    }
  };

  const inputHandler1 = async (e) => {
    setprivacypolicy((old) => {
      return { ...old, description: e };
    });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setprivacypolicy((old) => {
      return { ...old, [name]: value };
    });
  };

  const updateprivacypolicy = async (e) => {
    e.preventDefault();
    let res = await updateprivacypolicyAction(privacypolicy);
    if (res.success) {
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}privacypolicy`;
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
                  <h3 className="page-title mb-5 pb-2">Privacy Policy</h3>
                </div>
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}

            {/*Edit Modal */}
            <div>
              <div className="p-2">
                <form onSubmit={updateprivacypolicy}>
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
                        value={privacypolicy.title}
                      />
                    </div>
                      <JoditEditor
                        onChange={inputHandler1}
                        value={privacypolicy.description}
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
export default Privacypolicy;
