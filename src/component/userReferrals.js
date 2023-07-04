import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../coreFIles/config';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getUsersReferralsAction, getActivePhaseAction, loginAsUserAction } from '../Action/action';
import moment from 'moment';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const UserReferrals = () => {

    const [usersList, setusersList] = useState({});
    const [members, setMembers] = useState(`<i class="fa fa-spinner fa-spin"></i>`);
    const [referralEarning, setReferralEarning] = useState(`<i class="fa fa-spinner fa-spin"></i> BBE`);
    const [totalDeposit, setTotalDeposit] = useState(`<i class="fa fa-spinner fa-spin"></i> BBE`);
    const[loader,setLoader]=useState(true)
    let {user_id} = useParams();

    useEffect(() => {
      getUsersReferrals();
    }, [])

    const getUsersReferrals = async () => {
        setLoader(true)
        let res = await getUsersReferralsAction({ 'uid':user_id });
        if (res.success) {
            setLoader(false)
            let phase = await getActivePhaseAction();
            setMembers(res.data.length);
            if(res.data.length > 0)
            {
                let refEarning = parseFloat(res.data[0].refEarning).toFixed(2);
                let ttlDeposit = parseFloat(res.data[0].totalDeposit).toFixed(2);
                let usd_amt_refEarning = parseFloat(refEarning * phase.data.price).toFixed(2);
                let usd_amt_ttlDeposit = parseFloat(ttlDeposit * phase.data.price).toFixed(2);
                setusersList(res.data);
                setReferralEarning(refEarning+' BBE ~ $'+usd_amt_refEarning);
                setTotalDeposit(ttlDeposit+' BBE ~ $'+usd_amt_ttlDeposit);
            }
            else{
                setReferralEarning('0.00 BBE ~ $0.00');
                setTotalDeposit('0.00 BBE ~ $0.00');
            }
        }
    }

    const loginAsUser = async (email) => {
        let res = await loginAsUserAction({'email':email});
        if (res.success) {
            Cookies.set('loginSuccessSilkyExchange', JSON.stringify(res.data));
           
                window.open(
                    'https://mrmint.io/dashboard',
                    '_blank'
                  );
        }
    }
    const copieBtn = async () => {
        toast.success(`Coppied!!`);
    }
    const columns = [
        {
            key: "Sno.",
            text: "Sno.",
            cell: (row, index) => index + 1
        },
        {
            key: "email",
            text: "User Email",
            cell: (item) => {
                return (
                    <>
                    {item.email}
                    &nbsp; <CopyToClipboard text={item.email}>
                        <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color:'#bd8320' }}>
                        <i class="fa fa-copy "></i></sapn></CopyToClipboard>
                    </>
                );
            }
        },
        {
            key: "refer_by",
            text: "Referred By",
            cell: (item) => {
                return (
                    <>
                     {item.referred_by}
                    &nbsp; <CopyToClipboard text={item.referred_by}>
                        <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color:'#bd8320' }}>
                        <i class="fa fa-copy "></i></sapn></CopyToClipboard>
                    </>
                );
            }
        },
        {
            key: "deposit",
            text: "Total Purchase ",
            cell: (item) => {
                return (
                    `${parseFloat(item.purchase).toFixed(2)} BBE ~ $${parseFloat(item.purchaseUSD).toFixed(2)} `
                );
            }
        },
        {
            key: "created_at",
            text: "Joining Date",
            cell: (item) => {
                return (
                    `${moment(item.created_at).format('DD/MM/YYYY')}`
                );
            }
        },
        {
            key: "action",
            text: "Action",
            cell: (item) => {
                return (
                    <>
                        <button onClick={() => loginAsUser(item.email)} type="button" className='btn btn-sm btn-primary' >Login</button>
                        
                    </>
                );
            }
        },
    ];

    const configForTable = {
        page_size: 10,
        length_menu: [10, 20, 50],
        show_filter: true,
        show_pagination: true,
        pagination: 'advance',
        button: {
            excel: true,
            print: false

        }
    }

    return (

        <>
            <div class="wrapper">
                {/* <div id="loader"></div> */}
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        {/* Main content */}
                        <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">User Referral Detail</h3>

                                </div>
                            </div>
                            <hr />
                        </div>
                        {/* Content Header (Page header) */}

                        {/* Main content */}
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                      <div className='row'>
                                        <div className='col-lg-4'>
                                          <h4>Total Team Members</h4>
                                          <h5>
                                          <div
                          dangerouslySetInnerHTML={{ __html: members }}
                          /></h5>
                                        </div>
                                        <div className='col-lg-4'>
                                          <h4>Total Referral Earning</h4>
                                          <h5>
                                          <div
                          dangerouslySetInnerHTML={{ __html: referralEarning }}
                          />  </h5>
                                        </div>
                                        <div className='col-lg-4'>
                                          <h4>Total Business</h4>
                                          <h5> <div
                          dangerouslySetInnerHTML={{ __html: totalDeposit }}
                          /></h5>
                                        </div>
                                      </div>
                                    <div className="box">

                                        <div className="box-header with-border">
                                            <h4 className="box-title">All Users view</h4>
                                        </div>
                                        <div className="box-body">
                                            <div className="table-responsive">
                                            {!loader ?
                                                 <ReactDatatable
                                                    config={configForTable}
                                                    records={usersList}
                                                    columns={columns}
                                                    // loading={true}
                                                />
                                                :
                                                <>
                                                 <br/>
                                      <br/>
                                          <center><h4><i className='fa fa-spinner fa-spin'></i> &nbsp; Please wait</h4></center>
                                          <br/>
                                          <br/>
                                                </>
                                                  }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                        {/* /.content */}
                        {/* /.content */}
                    </div>
                </div>

                <Footer />
            </div>
        </>


    )

}
export default UserReferrals;