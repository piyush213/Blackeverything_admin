import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import {
  getsystemsettingAction, showiskycAction,
  updatesystemsettingAction, updateiskycAction, disableiskycAction, updatewithdrawAction
} from "../Action/action";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import Cookies from "js-cookie";

const Systemsetting = () => {
  const [systemsetting, setsystemsetting] = useState({});
  const [kycconfirm, setkycconfirm] = useState("");
  const [minwithdraw, setminwithdraw] = useState("");
  const [iskyc, setiskyc] = useState("");
  useEffect(() => {
    getsystemsetting();
    getshowiskyc();
  }, []);

  const getsystemsetting = async () => {
    let res = await getsystemsettingAction();
    if (res) {
      setsystemsetting(res.data);
    }
  };

  const getshowiskyc = async () => {
    let res = await showiskycAction();
    if (res) {
      setiskyc(res.data.is_kyc);
      console.log("1234", res.data);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setsystemsetting((old) => {
      return { ...old, [name]: value };
    });
  };

  const updatesystemsetting = async (e) => {
    e.preventDefault();
    let res = await updatesystemsettingAction(systemsetting);
    if (res.success) {
      toast.success(res.msg);
      setkycconfirm()
      setTimeout(() => {
        window.location.href = `${config.baseUrl}systemsetting`;
      }, 2000);
    } else {
      toast.error(res.msg);
    }
  };

  const updatewithdraw = async (e) => {
    e.preventDefault();
    let res = await updatewithdrawAction(systemsetting);
    if (res.success) {
      setsystemsetting(res.data)
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}systemsetting`;
      }, 2000);
    } else {
      toast.error(res.msg);
    }
  };

  const updateiskycs = async (e) => {
    // e.preventDefault();
    let res = await updateiskycAction();
    if (res.success) {
      toast.success(res.msg);
      setkycconfirm(<div>Kyc Applied for all</div>)
      setTimeout(() => {
        window.location.href = `${config.baseUrl}systemsetting`;
      }, 2000);
    } else {
      toast.error(res.msg);
    }
  };

  const disableiskycs = async (e) => {
    // e.preventDefault();
    let res = await disableiskycAction();
    if (res.success) {
      toast.success(res.msg);
      setkycconfirm(<div>Kyc Rejected for all</div>)
      setTimeout(() => {
        window.location.href = `${config.baseUrl}systemsetting`;
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
        <Toaster />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Systemsetting</h3>
                </div>

                {/* <div>{mask}</div> */}
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}

            {/*Edit Modal */}
            <div className="container">
              <div className="p-2">
                <form
                  onSubmit={updatesystemsetting}
                >
                  <div className="modal-body">
                    <div className="container">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Withdraw Fee Percentage
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }}
                          onChange={inputHandler}
                          name="withdraw_fee"
                          value={systemsetting.withdraw_fee}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Referral Percentage
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="referral_percent"
                          value={systemsetting.referral_percent}
                          onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Referral Percentage level 2
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="referral_percent1"
                          value={systemsetting.referral_percent1}
                          onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Deposit Fee Percentage
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="deposit_fee"
                          value={systemsetting.deposit_fee}
                          onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }}
                        />
                      </div>





                      <div className="  mt-20">
                        <button type="submit" class="btn btn-primary  pull-right">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form></div>

              <div className="p-2">
                <form
                  onSubmit={updatewithdraw}
                >
                  <div className="modal-body">
                    <div className="container">


                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Minimum Withdraw Limit
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="min_withdraw"
                          value={systemsetting.min_withdraw}
                          onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Daily Max Withdraw Amount
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="daily_max_withdraw"
                          value={systemsetting.daily_max_withdraw}
                          onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }}
                        />
                      </div>



                      <div className="  mt-20">
                        <button type="submit" class="btn btn-primary  pull-right">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form></div>

              <div className="p-2">
                <form
                  onSubmit={updatewithdraw}
                >
                  <div className="modal-body">
                    <div className="container">


                      {/* <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Token Price
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={inputHandler}
                          name="min_withdraw"
                          value={systemsetting.min_withdraw}
                          onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }}
                        />
                      </div> */}
                      {/* <div className="  mt-20">
                        <button type="submit" class="btn btn-primary  pull-right">
                          Submit
                        </button>
                      </div> */}
                    </div>
                  </div>
                </form></div>



              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Kyc Status for all &nbsp; &nbsp; &nbsp;
                </label>
                <button onClick={() => updateiskycs()} type="button" className='btn btn-sm btn-primary '  >KYC Enable</button> &nbsp;
                <button onClick={() => disableiskycs()} type="button" className='btn btn-sm btn-danger ' >KYC Disable</button>
                <p>{iskyc == 1 ? "KYC Enabled" : "KYC Disabled"}</p>
              </div>
            </div>
            {/* /.content */}



          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default Systemsetting;
