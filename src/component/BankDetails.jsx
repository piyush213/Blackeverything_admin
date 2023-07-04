import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import {
  getbankdetailsAction,
  updatebankdetailsAction,
} from "../Action/action";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import Cookies from "js-cookie";

const BankDetails = () => {
  const [bankdetails, setbankdetails] = useState({});

  useEffect(() => {
    getbankdetails();
  }, []);

  const getbankdetails = async () => {
    let res = await getbankdetailsAction();
    if (res) {
      setbankdetails(res.data);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setbankdetails((old) => {
      return { ...old, [name]: value };
    });
  };

  const updatebankdetails = async (e) => {
    e.preventDefault();
    let res = await updatebankdetailsAction(bankdetails);
    if (res.success) {
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}bankdetails`;
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
                  <h3 className="page-title mb-5 pb-2">Bank Details</h3>
                </div>

                {/* <div>{mask}</div> */}
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}

            {/*Edit Modal */}
            <div>
              <div className="p-2">
                <form onSubmit={updatebankdetails}>
                  <div className="modal-body">
                    <div className="container">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Account Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="account_name"
                          value={bankdetails.account_name}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Branch Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="branch_name"
                          value={bankdetails.branch_name}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Bank Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="bank_name"
                          value={bankdetails.bank_name}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Account Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="account_number"
                          value={bankdetails.account_number}
                          onKeyPress={(event) => {
                            if (!/^\d*[.]?\d{0,1}$/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                      </div>
                      
                      
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="ifsc_code"
                          value={bankdetails.ifsc_code}
                        />
                      </div>

                      <div className=" mx-10  mt-20">
                        <button
                          type="submit"
                          class="btn btn-primary mx-20 pull-right"
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
export default BankDetails;
