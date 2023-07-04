import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Sidebar from '../directives/sidebar'
import ReactDatatable from '@ashvin27/react-datatable';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getuserDetailsAction, getTransactionHistoryAction,loginAsUserAction,UserBlockAction,UserUnBlockAction} from '../Action/action';
const Userdetails = () => {
    const [totalSellMNT, setTotalSellMNT] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState({});
    const [getuserdetaillist, setusersDetailList] = useState({});
    const [form, setForm] = useState({
        id: '', profile_pic: '', previewImage: '', first_name: '', email: '', balance: '', last_name: '', bnb_address: '', reward_wallet: '', refer_by: '', stacking_balance: '', vesting_balance: '', stage: '', blocked: '', block: '', created_at: ''
    });
    useEffect(() => {
        getuserDetails();

        getTransactionHistory();
    }, []);

    const loginAsUser = async (email, type) => {
        let res = await loginAsUserAction({'email': email });
        if (res.success) {
            Cookies.set('loginSuccessSilkyExchange', JSON.stringify(res.data));
            if(type == "normal")
            {
                window.open(
                    'https://mrmint.io/dashboard',
                    '_blank'
                );
            }
            else{
                window.open(
                    'https://mrmint.io/mlmdashboard',
                    '_blank'
                );
            }
        }
    }
    const getuserDetails = async () => {
        const id = window.location.href.split("/").pop();
        let res = await getuserDetailsAction({ 'id': id });
        if (res.success) {
            setusersDetailList([res.data])

            let data = res.data;
            setForm((old) => {
                return { ...old, "id": id, 'previewImage': config.imageUrl + data?.profile_pic, 'first_name': data?.first_name, 'email': data?.email, 'balance': data?.balance, 'last_name': data?.last_name, 'bnb_address': data?.bnb_address, 'reward_wallet': data?.reward_wallet, 'refer_by': data?.refer_by, 'stacking_balance': data?.stacking_balance, 'vesting_balance': data?.vesting_balance, 'stage': data?.stage, 'blocked': data.blocked, 'block': data?.block, 'created_at': data?.created_at }
            })
        }
        console.log(res.success)
    }



    const getTransactionHistory = async () => {
        const id = window.location.href.split("/").pop();
        let res = await getTransactionHistoryAction({ type: 3, 'user_id': id });
        setTotalSellMNT(0)
        if (res.success) {
            // alert(res.success)
            // console.log(res.data);
            setTransactionHistory(res.data)
            setTotalSellMNT(res.data[0].totalSale)
        }
    }


    const UserBlock = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Block this User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Block it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await  await UserBlockAction({ 'id': id });
                if (res.success) {
                    getuserDetails();
                    // toast.success(res.msg);
                    Swal.fire(
                        'Rejected!',
                        res.msg,
                        'success'
                      )
                } else {
                    Swal.fire(
                        'Failed!',
                        res.msg,
                        'error'
                    )
                    // toast.error(res.msg);
                }
            }
          })
    }

    const UserUnBlock = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Unblock this User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Unblock it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await  await UserUnBlockAction({ 'id': id });
                if (res.success) {
                    getuserDetails();
                    // toast.success(res.msg);
                    Swal.fire(
                        'Rejected!',
                        res.msg,
                        'success'
                      )
                } else {
                    Swal.fire(
                        'Failed!',
                        res.msg,
                        'error'
                    )
                    // toast.error(res.msg);
                }
            }
          })
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
        // {
        //     key: "bnb_address",
        //     text: "Address",
        //     cell: (item) => {
        //         return(
        //        <>
        //         {item.bnb_address}
        //         </>
        //         );
        //     }
        // },

        {
            key: "amount",
            text: "Amount (BNB)",
            cell: (item) => {
                return (

                    `${parseFloat(item.amount).toFixed(2)} BNB`

                );

            }
        },
        {
            key: "token",
            text: "Amount (BBE)",
            cell: (item) => {
                return (

                    `${parseFloat(item.token).toFixed(2)} BBE`

                );

            }
        },

        {
            key: "phase_name",
            text: "Phase Name",
            cell: (item) => {
                return (
                    <>
                        {item.phase_name}
                    </>
                );

            }
        },
        {
            key: "created_at",
            text: "Date",
            cell: (item) => {
                return (
                    `${moment(item.created_at).format('DD/MM/YYYY')}`
                );
            }
        },

        {
            key: "transactionHash",
            text: "Action",
            cell: (item) => {
                return (
                    <>
                        {item.status == 0 ?
                            <a target='__blank' href={`https://bscscan.com/tx/${item.transactionHash}`} className='btn btn-default btn btn-primary'>Blockchain View</a>
                            :
                            ''
                        }
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
            excel: false,
            print: false

        }
    }
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
                                                <center class="loginLogo"><img src={`${config.baseUrl}/images/avatar-1.png`} /></center>

                                            </div>
                                        </div>
                                        <hr/>
                                        <div className='row'>
                                            
                                            <div className='col-sm-6'>
                                            <div className='dummys_btn'>
                                                <button class="btn btn-primary btn-sm">
                                                    <a href={`${config.baseUrl}userReferrals/` + form.id} >Team</a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                            <div className='dummys_btn'>
                                            {form.blocked === 0 ?

                                    <button type="button" onClick={() => UserBlock(form.id)} className='btn btn-sm btn-primary'>Block </button>

                                            : form.blocked === 1 ?
                                <button type="button" onClick={()=>UserUnBlock(form.id)} className='btn btn-sm btn-primary'>Unblock </button>
                                             :
                                             ''
                                            }
                                                   
                                                    {/* <button type="button" class="btn btn-sm btn-primary"><a href={`${config.baseUrl}userReferrals/` + form.id}>Team</a></button> */}
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                
                                                <div className='dummys_btn'>
                                                    <button type="button"  onClick={() => loginAsUser(form.email, 'normal')} class="btn btn-sm btn-primary">Dashboard Login</button>
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <div className='dummys_btn'>
                                                <button type="button"  onClick={() => loginAsUser(form.email, 'business')} class="btn btn-sm btn-primary">Business Login</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-7">

                                        <div className="user_details">

                                            <h3>User Details</h3>
                                            <table style={{ width: '100%' }} id="usertableid">
                                                <tbody>
                                                    <tr>
                                                        <th  colspan="2">Full Name:</th>
                                                        <td  colspan="2">{form.first_name} {form.last_name}</td>
                                                    </tr>

                                                    <tr>
                                                        <th colspan="2">Email</th>
                                                        <td  colspan="2">
                                                        {form.email}                        
                &nbsp;<CopyToClipboard text={form.email}>
                <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color:'#bd8320' }}>
                <i class="fa fa-copy "></i></sapn></CopyToClipboard>
                                                            
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th colspan="2">Address</th>
                                                        <td colspan="2">{form.bnb_address}
                    &nbsp;<CopyToClipboard text={form.bnb_address}>
                <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color:'#bd8320' }}>
                <i class="fa fa-copy "></i></sapn></CopyToClipboard>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th colspan="2">Refer By Address</th>
                                                        <td colspan="2">{form.refer_by}
                                                        &nbsp;<CopyToClipboard text={form.refer_by}>
                                                <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color:'#bd8320' }}>
                                                     <i class="fa fa-copy "></i></sapn></CopyToClipboard>
                                                        </td>
                                                    </tr>
                                                <tr>
                                                    <th colSpan="2">Level </th>
                                                    <td>{form.block} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                    <th>Block &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {form.block}</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan="2">Status</th>
                                                    <td style={{ color: form.blocked ? 'red' : 'green' }}>{form.blocked ? 'Blocked' : 'Active'}</td>
                                                    <th>Registration Date &nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {moment(form.created_at).format('DD/MM/YYYY')}</th>
                                                </tr>
                                                    {/* <table id='maindiv'>
                                                        
                                                    <tr>
                                                        <td>Reward Wallet</td>
                                                        <td>{form.reward_wallet}</td>
                                                        <td>Block</td>
                                                        <td>{form.block}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Status</td>
                                                        <td style={{ color: form.blocked ? 'red' : 'green' }}>{form.blocked ? 'Blocked' : 'Active'}</td>
                                                        <td>Created At</td>
                                                        <td>{moment(form.created_at).format('DD/MM/YYYY')}</td>
                                                    </tr>
                                                    </table> */}
                                                    <tr>
                                                        {/* <th>Status</th>
                                                        <td style={{ color: form.blocked ? 'red' : 'green' }}>{form.blocked ? 'Blocked' : 'Active'}</td> */}
                                                    </tr>
                                                    <tr>
                                                        {/* <th>Created At</th>
                                                        <td>{moment(form.created_at).format('DD/MM/YYYY')}</td> */}
                                                    </tr>
                                                    <tr >
                                                        <th class="text-center" colspan="4">Balance</th>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan="2">Balance</th>
                                                        <td colSpan="2">{form.balance}</td>
                                                    </tr>

                                                    <tr>
                                                        <th colSpan="2">Stacking Balance</th>
                                                        <td colSpan="2">{form.stacking_balance}</td>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan="2">Vesting Balance</th>
                                                        <td colSpan="2">{form.vesting_balance}</td>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan="2">Referrals Balance</th>
                                                        <td colSpan="2">{form.vesting_balance}</td>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan="2">Withdraw Amount</th>
                                                        <td colSpan="2">{form.vesting_balance}</td>
                                                    </tr>
                                                </tbody>
                                            </table>


                                        </div>

                                    </div>

                                    <div className='col-md-12 pt-4 mt-3'>
                                        <div className="box">
                                            <div className="box-header with-border">
                                                <h4 className="box-title">Purchase History</h4>
                                                <span className='pull-right'>
                                                    <h5>Total Sell : {totalSellMNT} MNT </h5>
                                                </span>
                                            </div>

                                            <div className="box-body">

                                                <ReactDatatable
                                                    config={configForTable}
                                                    records={transactionHistory}
                                                    columns={columns}
                                                />

                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className='col-md-12 pt-4 mt-3'>
                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h4 className="box-title">Stakinghistory History</h4>
                                            <span className='pull-right'>
                                                <h5>Total Sell : {totalSellMNT} MNT ~ ${totalSellMNT}</h5> 
                                            </span>
                                        </div>
                                    
                                        <div className="box-body">
                                            
                                            <ReactDatatable
                                                config={configForTable}
                                                records={transactionHistory}
                                                columns={columns}
                                            />
                                           
                                        </div>
                                    </div>
                                </div> */}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Userdetails;