import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import { webcontentAction, updatedeposit_contentAction } from "../Action/action";
import toast, { Toaster } from "react-hot-toast";
import JoditEditor from "jodit-react";
import config from "../coreFIles/config";

const DepositInrContent = () => {
  const [webcontent, setwebcontent] = useState({});

  useEffect(() => {
    getwebcontent();
  }, []);

  const getwebcontent = async () => {
    let res = await webcontentAction();
    if (res) {
      setwebcontent(res.data);
    }
  };

  const inputHandler1 = async (e) => {
    setwebcontent((old) => {
      return { ...old, deposit_content: e };
    });
  };


  const updatewebcontent = async (e) => {
    e.preventDefault();
    let res = await updatedeposit_contentAction(webcontent);
    console.log("updatewebcontent",res);
    if (res.success) {
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}depositinrcontent`;
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
                  <h3 className="page-title mb-5 pb-2">Deposit INR Content</h3>
                </div>
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}

            {/*Edit Modal */}
            <div>
              <div className="p-2">
                <form onSubmit={updatewebcontent}>
                  <div className="modal-body">
                    <div className="container">
                      <div className="mb-3"></div>
                     
                      <div className="mb-3">
                      <h4>Deposit INR Content</h4>
                    </div>
                      <JoditEditor
                        onChange={inputHandler1}
                        value={webcontent.deposit_content}
                        name="deposit_content"
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
export default DepositInrContent;
