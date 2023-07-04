import React, { useEffect, useState } from "react";
import config from "../coreFIles/config";
import Header from "../directives/header";
import Sidebar from "../directives/sidebar";
import ReactDatatable from "@ashvin27/react-datatable";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  getuserDetailsAction,
  getTransactionHistoryAction,
  loginAsUserAction,
  UserBlockAction,
  UserUnBlockAction,
  getStacHistoryAction,
  getPurchaseHistoryAction,
  getstackingEarningAction,
  getReferalEarningAction,
  getwithdrawhistoryAction,
  getMntWalletsDetailsAction,
  getgetuserbankdetailsAction
} from "../Action/action";

const Userdetails = () => {
  const [totalSellMNT, setTotalSellMNT] = useState(0);
  const [totalpurchaseMNT, setTotalPurchaseMNT] = useState(0);
  const [totalpurchaseUSDT, setTotalPurchaseUSDT] = useState(0);
  const [totalstakingMNT, setTotalStakingMNT] = useState(0);
  const [totalstakingUSDT, setTotalStakingUSDT] = useState(0);
  const [totalstakingearningMNT, setTotalStakingEarningMNT] = useState(0);
  const [totalstakingearningUSDT, setTotalStakingEarningUSDT] = useState(0);
  const [totalstareferalerningMNT, setTotalRefrealEarningMNT] = useState(0);
  const [totalreferalearningUSDT, setTotalRefrealEarningUSDT] = useState(0);
  const [totalwithdrawhistoryMNT, setTotalWithdrawHistoryMNT] = useState(0);
  const [totalwithdrawhistoryUSDT, setTotalWithdrawHistoryUSDT] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState({});
  const [getuserdetaillist, setusersDetailList] = useState({});
  const [userbankdetails, setuserbankdetails] = useState({});
  const [mntWalletDetails, setmntWalletDetails] = useState([]);
  const [form, setForm] = useState({
    id: "",
    profile_pic: "",
    previewImage: "",
    first_name: "",
    email: "",
    balance: "",
    balance_usd: "",
    last_name: "",
    bnb_address: "",
    reward_wallet: "",
    refer_by: "",
    stacking_balance: "",
    stacking_balance_usd: "",
    vesting_balance: "",
    vesing_balance_usd: "",
    totalRefEarning: "",
    totalRefEarningUSD: "",
    totalWithdraw: "",
    totalWithdrawUSD: "",
    stage: "",
    blocked: "",
    block: "",
    created_at: "",
    apy: "",
    refemail: "",
  });
  const [getstachistoryList, setStacHistoryList] = useState({});
  const [getpurchasehistoryList, setPurchaseHistoryList] = useState({});
  const [getstackingearningList, setStackingEarningList] = useState({});
  const [getReferalEarningList, setReferalEarningList] = useState({});
  const [getWithdrawHistoryList, setWithdrawHistoryList] = useState({});
  useEffect(() => {
    getuserDetails();
    getStacHistory();
    getPurchaseHistory();
    getstackingEarning();
    getReferalEarning();
    getTransactionHistory();
    getwithdrawHistory();
    getgetuserbankdetails();
    getMntWalletsDetails();
  }, []);

  const loginAsUser = async (email, type) => {
    let res = await loginAsUserAction({ email: email });
    if (res.success) {
      Cookies.set("loginSuccessSilkyExchange", JSON.stringify(res.data));
      if (type == "normal") {
        window.open("https://mrmint.io/dashboard", "_blank");
      } else {
        window.open("https://mrmint.io/mlmdashboard", "_blank");
      }
    }
  };
  const getuserDetails = async () => {
    const id = window.location.href.split("/").pop();
    let res = await getuserDetailsAction({ id: id });
    console.log("setusersDetailList", res.data);
    if (res.success) {
      setusersDetailList([res.data]);
      // console.log("setusersDetailList", res.data);

      let data = res.data;
      setForm((old) => {
        return {
          ...old,
          id: id,
          previewImage: config.imageUrl + data?.profile_pic,
          first_name: data?.first_name,
          email: data?.email,
          balance: data?.balance,
          balance_usd: data?.balance_usd,
          last_name: data?.last_name,
          bnb_address: data?.bnb_address,
          reward_wallet: data?.reward_wallet,
          refer_by: data?.refer_by,
          refemail: data?.refemail,
          stacking_balance: data?.stacking_balance,
          stacking_balance_usd: data?.stacking_balance_usd,
          vesting_balance: data?.vesting_balance,
          vesing_balance_usd: data?.vesing_balance_usd,
          totalRefEarning: data?.totalRefEarning,
          totalRefEarningUSD: data?.totalRefEarningUSD,
          totalWithdraw: data?.totalWithdraw,
          totalWithdrawUSD: data?.totalWithdrawUSD,
          stage: data?.stage,
          blocked: data.blocked,
          block: data?.block,
          created_at: data?.created_at,
          referral_code: data?.referral_code,
        };
      });
    }
    console.log(res.success);
  };

  const getTransactionHistory = async () => {
    const id = window.location.href.split("/").pop();
    let res = await getTransactionHistoryAction({ type: 3, user_id: id });
    setTotalSellMNT(0);
    if (res.success) {
      // alert(res.success)
      // console.log(res.data);
      setTransactionHistory(res.data);
      setTotalSellMNT(res.data[0].totalSale);
    }
  };

  const getMntWalletsDetails = async () => {
    const id = window.location.href.split("/").pop();
    let res = await getMntWalletsDetailsAction({ type: 3, user_id: id });
    console.log("id",id);
    setTotalSellMNT(0);
    if (res.success) {
      console.log("setmntWalletDetails",res.data);
      // alert(res.success)
      // console.log(res.data);
      // setTransactionHistory(res.data);
      setmntWalletDetails(res.data.totalTokenStack);
    }
  };

  const getgetuserbankdetails = async () => {
    const id = window.location.href.split("/").pop();
    let res = await getgetuserbankdetailsAction({ id: id });
    if (res.success) {
      // alert(res.success)
      // console.log(res.data);
      setuserbankdetails(res.data);
      console.log("setuserbankdetails",res.data);
    }
  };

  const viewTeam = async (id) => {
    window.open(config.baseUrl + "userReferrals/" + id, "_blank");
  };

  const UserBlock = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Block this User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Block it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await await UserBlockAction({ id: id });
        if (res.success) {
          getuserDetails();
          // toast.success(res.msg);
          Swal.fire("Rejected!", res.msg, "success");
        } else {
          Swal.fire("Failed!", res.msg, "error");
          // toast.error(res.msg);
        }
      }
    });
  };

  const UserUnBlock = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Unblock this User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unblock it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await await UserUnBlockAction({ id: id });
        if (res.success) {
          getuserDetails();
          // toast.success(res.msg);
          Swal.fire("Rejected!", res.msg, "success");
        } else {
          Swal.fire("Failed!", res.msg, "error");
          // toast.error(res.msg);
        }
      }
    });
  };
  const copieBtn = async () => {
    toast.success(`Coppied!!`);
  };

  const columns = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },

    {
      key: "amount",
      text: "Amount (INR)",
      cell: (item) => {
        return `${parseFloat(item.amount).toFixed(2)} INR`;
      },
    },
    {
      key: "token",
      text: "Amount (BBE)",
      cell: (item) => {
        return `${parseFloat(item.token).toFixed(2)} BBE`;
      },
    },

    {
      key: "phase_name",
      text: "Phase Name",
      cell: (item) => {
        return <>{item.phase_name}</>;
      },
    },
    {
      key: "created_at",
      text: "Date",
      cell: (item) => {
        return `${moment(item.created_at).format("DD/MM/YYYY")}`;
      },
    },

  //   {
  //     key: "transactionHash",
  //     text: "Action",
  //     cell: (item) => {
  //       return (
  //         <>
  //           {item.status == 0 ? (
  //             <a
  //               target="__blank"
  //               href={`https://bscscan.com/tx/${item.transactionHash}`}
  //               className="btn btn btn-primary btn-sm"
  //             >
  //               Blockchain View
  //             </a>
  //           ) : (
  //             ""
  //           )}
  //         </>
  //       );
  //     },
  //   },
  ];

  const getStacHistory = async () => {
    const id = window.location.href.split("/").pop();
    let res = await getStacHistoryAction({ id: id });
    console.log("456",res.data);
    setTotalStakingMNT(0);
    setTotalStakingUSDT(0);
    if (res.success) {
      setStacHistoryList(res.data);
      console.log("gettotal staking",res.data);
      setTotalStakingMNT(res.data[0].totalStaking);
      setTotalStakingUSDT(res.data[0].totalStakingUSD);
    }
  };

  const columns1 = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },

    {
      key: "amount",
      text: "Amount",
      cell: (item) => {
        return (
          <>
            {parseFloat(item.amount).toFixed(2)} BBE ~ INR
            {parseFloat(item.usd_amount).toFixed(2)}
          </>
        );
      },
    },

    // {
    //     key: "usd_amount",
    //     text: "Amount ($)",
    //     cell: (item) => {
    //         return (

    //             `$${parseFloat(item.usd_amount).toFixed(2)}`

    //         );

    //     }
    // },

    {
      key: "period",
      text: "Period",
      cell: (item) => {
        return <>{item.period?item.period:""}</>;
      },
    },
    {
      key: "apy",
      text: "APY(%)",
      cell: (item) => {
        return <>{item.apy}</>;
      },
    },
    // {
    //   key: "usd_amount",
    //   text: "Month Passed",
    //   cell: (item) => {
    //     return `${item.period - item.remaining} Month`;
    //   },
    // },

    {
      key: "updated_at",
      text: "Update",
      cell: (item) => {
        return `${moment(item.updated_at).format("DD/MM/YYYY")}`;
      },
    },

    // {
    //     key: "transactionHash",
    //     text: "Action",
    //     cell: (item) => {
    //         return (
    //             <>
    //                 {item.status == 0 ?
    //                     <a target='__blank' href={`https://bscscan.com/tx/${item.transactionHash}`} className='btn btn-default btn btn-primary'>Blockchain View</a>
    //                     :
    //                     ''
    //                 }
    //             </>

    //         );
    //     }
    // },
  ];

  const getPurchaseHistory = async () => {
    const id = window.location.href.split("/").pop();
    let res = await getPurchaseHistoryAction({ user_id: id });
    setTotalPurchaseMNT(0);
    setTotalPurchaseUSDT(0);
    if (res.success) {
      setPurchaseHistoryList(res.data);
      setTotalPurchaseMNT(res.data[0].userPurchase);
      setTotalPurchaseUSDT(res.data[0].userPurchaseUSD);
    }
  };
  const columns2 = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },

    {
      key: "token",
      text: "Token(BBE)",
      cell: (item) => {
        return (
          <>
            {item.token} BBE ~ INR{parseFloat(item.usd_amount).toFixed(2)}
          </>
        );
      },
    },

    {
      key: "amount",
      text: "Amount (BBE)",
      cell: (item) => {
        return `${parseFloat(item.amount).toFixed(6)} BBE`;
      },
    },
    // {
    //     key: "usd_amount",
    //     text: "Usd Amount",
    //     cell: (item) => {
    //         return (

    //             `${parseFloat(item.usd_amount).toFixed(2)}`

    //         );

    //     }
    // },

    {
      key: "phase",
      text: "Phase",
      cell: (item) => {
        return <>{item.phase}</>;
      },
    },

    {
      key: "updated_at",
      text: "Update",
      cell: (item) => {
        return `${moment(item.created_at).format("DD/MM/YYYY")}`;
      },
    },

    // {
    //   key: "transactionHash",
    //   text: "Action",
    //   cell: (item) => {
    //     return (
    //       <>
    //         {item.status == 0 ? (
    //           <a
    //             target="__blank"
    //             href={`https://bscscan.com/tx/${item.transactionHash}`}
    //             className="btn btn btn-primary btn-sm"
    //           >
    //             Blockchain View
    //           </a>
    //         ) : (
    //           ""
    //         )}
    //       </>
    //     );
    //   },
    // },
  ];

  const getstackingEarning = async () => {
    const id = window.location.href.split("/").pop();
    let res = await getstackingEarningAction({ user_id: id });
    console.log("getstackingEarningAction", res.data);
    setTotalStakingEarningMNT(0);
    setTotalStakingEarningUSDT(0);
    if (res.success) {
      setStackingEarningList(res.data);
      console.log("setStackingEarningList", res.data);
      setTotalStakingEarningMNT(res.data[0].totalEarning);
      setTotalStakingEarningUSDT(res.data[0].totalEarningUSD);
    }
  };
  const columns3 = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },

    // {
    //     key: "type",
    //     text: "Type",
    //     cell: (item) => {
    //         return(
    //             <>
    //             {item.type}

    //             </>
    //         );
    //     }
    // },

    {
      key: "amount",
      text: "Amount",
      cell: (item) => {
        return `${parseFloat(item.amount).toFixed(2)} BBE`
        
    },
  },

    {
      key: "history",
      text: "History",
      cell: (item) => {
        return <>{item.history}</>;
      },
    },

    {
      key: "created_at",
      text: "Date",
      cell: (item) => {
        return `${moment(item.created_at).format("DD/MM/YYYY")}`;
      },
    },

    // {
    //     key: "transactionHash",
    //     text: "Action",
    //     cell: (item) => {
    //         return (
    //             <>
    //                 {item.status == 0 ?
    //                     <a target='__blank' href={`https://bscscan.com/tx/${item.transactionHash}`} className='btn btn-default btn btn-primary'>Blockchain View</a>
    //                     :
    //                     ''
    //                 }
    //             </>

    //         );
    //     }
    // },
  ];

  const getReferalEarning = async () => {
    const id = window.location.href.split("/").pop();
    let res = await getReferalEarningAction({ user_id: id });
    console.log("getReferalEarning",res.data);
    setTotalRefrealEarningMNT(0);
    setTotalRefrealEarningUSDT(0);
    if (res.success) {
      setReferalEarningList(res.data);
      console.log("setReferalEarningList",res.data);
      setTotalRefrealEarningMNT(res.data[0].totalRefEarning);
      setTotalRefrealEarningUSDT(res.data[0].totalRefEarningUSD);
    }
  };
  const columns4 = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },

    // {
    //   key: "email",
    //   text: "Email",
    //   cell: (item) => {
    //     return (
    //       <>
    //         {item.email}
    //         &nbsp;{" "}
    //         <CopyToClipboard text={item.email}>
    //           <sapn
    //             title="Click to Copy"
    //             className="mr-copylink"
    //             id="token-buy-button"
    //             onClick={copieBtn}
    //             style={{ cursor: "pointer", color: "#bd8320" }}
    //           >
    //             <i class="fa fa-copy "></i>
    //           </sapn>
    //         </CopyToClipboard>
    //       </>
    //     );
    //   },
    // },

    // {
    //   key: "address",
    //   text: "Address",
    //   cell: (item) => {
    //     return (
    //       <>
    //         {item.bnb_address.substring(0, 6) +
    //           "...." +
    //           item.bnb_address.substring(item.bnb_address.length - 6)}
    //         &nbsp;{" "}
    //         <CopyToClipboard text={item.bnb_address}>
    //           <sapn
    //             title="Click to Copy"
    //             className="mr-copylink"
    //             id="token-buy-button"
    //             onClick={copieBtn}
    //             style={{ cursor: "pointer", color: "#bd8320" }}
    //           >
    //             <i class="fa fa-copy "></i>
    //           </sapn>
    //         </CopyToClipboard>
    //       </>
    //     );
    //   },
    // },
    {
      key: "amount",
      text: "Amount (INR)",
      cell: (item) => {
        return `${parseFloat(item.amount).toFixed(2)} INR `;
      },
    },

    {
      key: "referral_percent",
      text: "Referral Percent",
      cell: (item) => {
        return <>{item.referral_percent} %</>;
      },
    },

    {
      key: "created_at",
      text: "Date",
      cell: (item) => {
        return `${moment(item.created_at).format("DD/MM/YYYY")}`;
      },
    },

    // {
    //     key: "transactionHash",
    //     text: "Action",
    //     cell: (item) => {
    //         return (
    //             <>
    //                 {item.status == 0 ?
    //                     <a target='__blank' href={`https://bscscan.com/tx/${item.transactionHash}`} className='btn btn-default btn btn-primary'>Blockchain View</a>
    //                     :
    //                     ''
    //                 }
    //             </>

    //         );
    //     }
    // },
  ];

  const getwithdrawHistory = async () => {
    const user_id = window.location.href.split("/").pop();
    let res = await getwithdrawhistoryAction({ user_id: user_id });
    console.log("getwithdrawHistory", res.data);
    setTotalWithdrawHistoryMNT(0);
    setTotalWithdrawHistoryUSDT(0);
    if (res.success) {
      setWithdrawHistoryList(res.data);
      setTotalWithdrawHistoryMNT(res.data[0].totalWithdraw);
      setTotalWithdrawHistoryUSDT(res.data[0].totalWithdrawUSD);
    }
  };
  const columns5 = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },

    // {
    //   key: "address",
    //   text: "Address",
    //   cell: (item) => {
    //     return (
    //       <>
    //         {/* {item.bnb_address} */}
    //         {item.bnb_address.substring(0, 6) +
    //           "...." +
    //           item.bnb_address.substring(item.bnb_address.length - 6)}
    //         &nbsp;{" "}
    //         <CopyToClipboard text={item.bnb_address}>
    //           <sapn
    //             title="Click to Copy"
    //             className="mr-copylink"
    //             id="token-buy-button"
    //             onClick={copieBtn}
    //             style={{ cursor: "pointer", color: "#bd8320" }}
    //           >
    //             <i class="fa fa-copy "></i>
    //           </sapn>
    //         </CopyToClipboard>
    //       </>
    //     );
    //   },
    // },
    {
      key: "amount",
      text: "Amount",
      cell: (item) => {
        return `${parseFloat(item.amount).toFixed(2)} BBE ~ $${parseFloat(
          item.amountUSD
        ).toFixed(2)}`;
      },
    },

    {
      key: "created_at",
      text: "Approve Date",
      cell: (item) => {
        return `${
          item.created_at ? moment(item.created_at).format("DD/MM/YYYY") : "-"
        }`;
      },
    },

    {
      key: "status",
      text: "Status",
      cell: (item) => {
        return (
          <>
            {item.status}
            &nbsp;{" "}
            <CopyToClipboard text={item.status}>
              <sapn
                title="Click to Copy"
                className="mr-copylink"
                id="token-buy-button"
                onClick={copieBtn}
                style={{ cursor: "pointer", color: "#bd8320" }}
              >
              </sapn>
            </CopyToClipboard>
          </>
        );
      },
    },

    // {
    //     key: "transactionHash",
    //     text: "Action",
    //     cell: (item) => {
    //         return (
    //             <>
    //                 {item.status == 0 ?
    //                     <a target='__blank' href={`https://bscscan.com/tx/${item.transactionHash}`} className='btn btn-default btn btn-primary'>Blockchain View</a>
    //                     :
    //                     ''
    //                 }
    //             </>

    //         );
    //     }
    // },
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
  return (
    <>
      <div class="wrapper">
        <Header />
        <Sidebar />
        <Toaster />
        <div className="content-wrapper">
          <div className="container-full">
            <section>
              <div className="container pt-5">
                <div className="row">
                  <div className="col-md-5">
                    <div className="profile_section">
                      <div className="user_profile">
                        <center class="loginLogo">
                          <img src={`${config.baseUrl}/images/avatar-1.png`} />
                        </center>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="dummys_btn">
                          {/* <button
                            type="button"
                            onClick={() => viewTeam(form.id)}
                            className="btn btn-sm btn-primary"
                          >
                            Team{" "}
                          </button> */}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="dummys_btn">
                          {form.blocked === 0 ? (
                            <button
                              type="button"
                              onClick={() => UserBlock(form.id)}
                              className="btn btn-sm btn-primary"
                            >
                              Block{" "}
                            </button>
                          ) : form.blocked === 1 ? (
                            <button
                              type="button"
                              onClick={() => UserUnBlock(form.id)}
                              className="btn btn-sm btn-primary"
                            >
                              Unblock{" "}
                            </button>
                          ) : (
                            ""
                          )}

                          {/* <button type="button" class="btn btn-sm btn-primary"><a href={`${config.baseUrl}userReferrals/` + form.id}>Team</a></button> */}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="dummys_btn">
                          {/* <button
                            type="button"
                            // onClick={() => loginAsUser(form.email, "normal")}
                            class="btn btn-sm btn-primary"
                          >
                            Dashboard Login
                          </button> */}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="dummys_btn">
                          {/* <button
                            type="button"
                            // onClick={() => loginAsUser(form.email, "business")}
                            class="btn btn-sm btn-primary"
                          >
                            Business Login
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-7">
                    <div className="user_details">
                      <h3>User Details</h3>
                      <div className="table-responsive">
                      <table style={{ width: "100%" }} id="usertableid">
                        <tbody>
                          <tr>
                            <th colspan="2">Full Name:</th>
                            <td colspan="2">
                              {form.first_name} {form.last_name}
                            </td>
                          </tr>

                          <tr>
                            <th colspan="2">Emails</th>
                            <td colspan="2">
                              {form.email}
                              &nbsp;
                              <CopyToClipboard text={form.email}>
                                <sapn
                                  title="Click to Copy"
                                  className="mr-copylink"
                                  id="token-buy-button"
                                  onClick={copieBtn}
                                  style={{
                                    cursor: "pointer",
                                    color: "#bd8320",
                                  }}
                                >
                                  <i class="fa fa-copy "></i>
                                </sapn>
                              </CopyToClipboard>
                            </td>
                          </tr>
                          <tr>
                            <th colspan="2">Referral Code</th>
                            <td colspan="2">
                              {form.referral_code}
                              &nbsp;
                              <CopyToClipboard text={form.referral_code}>
                                <sapn
                                  title="Click to Copy"
                                  className="mr-copylink"
                                  id="token-buy-button"
                                  onClick={copieBtn}
                                  style={{
                                    cursor: "pointer",
                                    color: "#bd8320",
                                  }}
                                >
                                  <i class="fa fa-copy "></i>
                                </sapn>
                              </CopyToClipboard>
                            </td>
                          </tr>
                          <tr>
                            <th colspan="2">Refer By ID</th>
                            <td colspan="2">
                              {!form.refer_by ? "No refferer" : form.refer_by}
                              &nbsp;
                              {form.refer_by ?
                              <CopyToClipboard text={form.refer_by}>
                                <sapn
                                  title="Click to Copy"
                                  className="mr-copylink"
                                  id="token-buy-button"
                                  onClick={copieBtn}
                                  style={{
                                    cursor: "pointer",
                                    color: "#bd8320",
                                  }}
                                >
                                  <i class="fa fa-copy "></i>
                                </sapn>
                              </CopyToClipboard>:''}
                            </td>
                          </tr>
                          <tr>
                            <th colspan="2">Refer From</th>
                            <td colspan="2">
                              {!form.refemail ? "No refferer" : form.refemail}
                              &nbsp;
                              {form.refemail ?
                              <CopyToClipboard text={form.refemail}>
                                <sapn
                                  title="Click to Copy"
                                  className="mr-copylink"
                                  id="token-buy-button"
                                  onClick={copieBtn}
                                  style={{
                                    cursor: "pointer",
                                    color: "#bd8320",
                                  }}
                                >
                                  <i class="fa fa-copy "></i>
                                </sapn>
                              </CopyToClipboard>:''}
                            </td>
                          </tr>
                          <tr>
                            <th colSpan="2">Level </th>
                            <td>
                              {form.block}{" "}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </td>
                            <th>
                              Block &nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {form.block}
                            </th>
                          </tr>
                          <tr>
                            <th colSpan="2">Status</th>
                            <td
                              style={{ color: form.blocked ? "red" : "green" }}
                            >
                              {form.blocked ? "Blocked" : "Active"}
                            </td>
                            <th>
                              Registration Date &nbsp;&nbsp;&nbsp;&nbsp; :
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {moment(form.created_at).format("DD/MM/YYYY")}
                            </th>
                          </tr>

                          <tr>
                            <th class="text-center" colspan="4">
                              Balance 
                            </th>
                          </tr>
                          <tr>
                            <th colSpan="2">BBE Balance</th>
                            <td colSpan="2">
                              {parseFloat(form.balance).toFixed(2)} BBE ~ INR 
                              {parseFloat(form.balance).toFixed(2)}
                            </td>
                          </tr>

                          <tr>
                            <th colSpan="2">Staking Balance</th>
                            <td colSpan="2">
                              {!mntWalletDetails ?"0":parseFloat(mntWalletDetails).toFixed(2)} BBE
                              ~ INR 
                              {!mntWalletDetails ?"0":parseFloat(mntWalletDetails).toFixed(2)} {/* stacking_balance_usd*/}
                            </td>
                          </tr>
                          {/* <tr>
                            <th colSpan="2">Vesting Balance</th>
                            <td colSpan="2">
                              {parseFloat(form.vesting_balance).toFixed(2)} BBE
                              ~ $
                              {parseFloat(form.vesing_balance_usd).toFixed(2)}
                            </td>
                          </tr> */}
                          <tr>
                            <th colSpan="2">Referrals Balance</th>
                            <td colSpan="2">
                              {!totalstareferalerningMNT?" 0":parseFloat(totalstareferalerningMNT).toFixed(2)} BBE
                              ~ INR
                              {!totalreferalearningUSDT?" 0":parseFloat(totalreferalearningUSDT).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <th colSpan="2">Withdraw Amount</th>
                            <td colSpan="2">
                              {console.log("totalwithdraw",form.totalWithdraw)}
                              {parseFloat(totalwithdrawhistoryMNT).toFixed(2)} BBE ~
                              INR{parseFloat(totalwithdrawhistoryUSDT).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <th colSpan="2">Bank Name</th>
                            <td colSpan="2">
                              {userbankdetails.bank_name?userbankdetails.bank_name:"Bank details not filled"}
                            </td>
                          </tr>
                          <tr>
                            <th colSpan="2">Account Number</th>
                            <td colSpan="2">
                              {userbankdetails.account_number?userbankdetails.account_number:"Bank details not filled"}
                            </td>
                          </tr>
                          <tr>
                            <th colSpan="2">IFSC Code</th>
                            <td colSpan="2">
                              {userbankdetails.ifsc_code?userbankdetails.ifsc_code:"Bank details not filled"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 pt-4 mt-3">
                    <div className="box">
                      {/* <div className="box-header with-border">
                                                <h4 className="box-title">Customtab2 Tab</h4>
                                                <h6 className="box-subtitle">
                                                    Use default tab with class <code>customtab</code>
                                                </h6>
                                                </div> */}
                      {/* /.box-header */}
                      <div className="box-body">
                        {/* Nav tabs */}
                        <ul className="nav nav-tabs customtab2" role="tablist">
                          <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link active"
                              data-bs-toggle="tab"
                              href="#profile7"
                              role="tab"
                              aria-selected="false"
                            >
                              {/* <span className="hidden-sm-up">
                                <i className="ion-person" />
                              </span>{" "} */}
                              <span className="">
                                Purchase History
                              </span>
                            </a>{" "}
                          </li>

                          <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#home7"
                              role="tab"
                              aria-selected="false"
                            >
                              {/* <span className="hidden-sm-up">
                                <i className="ion-home" />
                              </span>{" "} */}
                              <span className="">
                                {" "}
                                Staking History
                              </span>
                            </a>{" "}
                          </li>

                          <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#messages7"
                              role="tab"
                              aria-selected="true"
                            >
                              {/* <span className="hidden-sm-up">
                                <i className="ion-email" />
                              </span>{" "} */}
                              <span className="">
                                Staking Earning
                              </span>
                            </a>{" "}
                          </li>
                          <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#last7"
                              role="tab"
                              aria-selected="true"
                            >
                              {/* <span className="hidden-sm-up">
                                <i className="ion-email" />
                              </span>{" "} */}
                              <span className="">
                                Referral Earning
                              </span>
                            </a>{" "}
                          </li>
                          <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#last8"
                              role="tab"
                              aria-selected="true"
                            >
                              {/* <span className="hidden-sm-up">
                                <i className="ion-email" />
                              </span>{" "} */}
                              <span className="">
                                Withdraw History
                              </span>
                            </a>{" "}
                          </li>
                        </ul>
                        {/* Tab panes */}
                        <div className="tab-content">
                          <div className="tab-pane" id="home7" role="tabpanel">
                            <div className="box">
                              <div className="box-header with-border">
                                <h4 className="box-title"> StakingHistory </h4>
                                <span className="pull-right">
                                  <h5>
                                    Total Staking : {totalstakingMNT} BBE ~ INR
                                    {totalstakingUSDT}
                                  </h5>
                                </span>
                              </div>

                              <div className="box-body">
                                <ReactDatatable
                                  config={configForTable}
                                  records={getstachistoryList}
                                  columns={columns1}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane active"
                            id="profile7"
                            role="tabpanel"
                          >
                            <div className="box">
                              <div className="box-header with-border">
                                <h4 className="box-title">Purchase History</h4>
                                <span className="pull-right">
                                  <h5>
                                    Total Purchase : {totalpurchaseMNT} BBE ~ INR 
                                    {totalpurchaseUSDT}
                                  </h5>
                                </span>
                              </div>

                              <div className="box-body">
                                <ReactDatatable
                                  config={configForTable}
                                  records={getpurchasehistoryList}
                                  columns={columns2}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane"
                            id="messages7"
                            role="tabpanel"
                          >
                            <div className="box">
                              <div className="box-header with-border">
                                <h4 className="box-title">Staking Earning</h4>
                                <span className="pull-right">
                                  <h5>
                                    Staking Earning : {totalstakingearningMNT}{" "}
                                    BBE ~ INR {totalstakingearningUSDT}
                                  </h5>
                                </span>
                              </div>

                              <div className="box-body">
                                <ReactDatatable
                                  config={configForTable}
                                  records={getstackingearningList}
                                  columns={columns3}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane" id="last7" role="tabpanel">
                            <div className="box">
                              <div className="box-header with-border">
                                <h4 className="box-title">Referral Earning</h4>
                                <span className="pull-right">
                                  <h5>
                                    Referral Earning :{" "}
                                    {totalstareferalerningMNT} BBE ~ INR
                                    {totalreferalearningUSDT}
                                  </h5>
                                </span>
                              </div>

                              <div className="box-body">
                                <ReactDatatable
                                  config={configForTable}
                                  records={getReferalEarningList}
                                  columns={columns4}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane" id="last8" role="tabpanel">
                            <div className="box">
                              <div className="box-header with-border">
                                <h4 className="box-title">Withdraw History</h4>
                                <span className="pull-right">
                                  <h5>
                                    Total Withdraw : {totalwithdrawhistoryMNT}{" "}
                                    BBE ~ INR{totalwithdrawhistoryMNT}
                                  </h5>
                                </span>
                              </div>

                              <div className="box-body">
                                <ReactDatatable
                                  config={configForTable}
                                  records={getWithdrawHistoryList}
                                  columns={columns5}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.box-body */}
                    </div>
                    {/* /.box */}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
export default Userdetails;
