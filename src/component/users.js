import React, { Component, useEffect, useState } from 'react'
import config from '../coreFIles/config';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import {  getUsersListAction,loginAsUserAction, UserBlockAction,UserUnBlockAction } from '../Action/action';
import moment from 'moment';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { queryAllByAttribute } from '@testing-library/react';

const Users = () => {
    const [form,setForm]=useState({from_date:'',to_date:''});
    // const [registerusersHistory, setRegisterUsersHistory] = useState({});
    const [usersList, setusersList] = useState({});
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        getUsersList();
    }, [])

    const getUsersList = async () => {
        
        setLoader(true)
        let res = await getUsersListAction(form);
       
        if (res.success) {
            setLoader(false)
            setusersList(res.data)
        }
    }

    const getUsersListReset = async () => {
        form.type='';

        setLoader(true)
        let res = await getUsersListAction();
       
        if (res.success) {
            setLoader(false)
            setusersList(res.data)
        }
    }
    const getUsersListToday = async () => {
        form.type=2;
        setLoader(true)
        let res = await getUsersListAction(form);


        if (res.success) {
            setLoader(false)
            setusersList(res.data)
        }
    }
    const getUsersListLastWeek = async () => {
        form.type=3;
        setLoader(true)
        let res = await getUsersListAction(form);
       
        if (res.success) {
            setLoader(false)
            setusersList(res.data)
        }
    }
    const getUsersListlastMonth = async () => {
        form.type=4;
        setLoader(true)
        let res = await getUsersListAction(form);
       
        if (res.success) {
            setLoader(false)
            setusersList(res.data)
        }
    }
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
                    getUsersList();
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
            text: "You want to Unlock this User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Unblock it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await  await UserUnBlockAction({ 'id': id });
                if (res.success) {
                    getUsersList();
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
    
    {
        key: "email",
        text: "Email",
        cell: (item) => {
            return (
                <>
                  <a target="__blank" href={`${config.baseUrl}userdetails/` + item.id} > {item.email} </a>
                    &nbsp; 
                    <CopyToClipboard text={item.email}>
                    <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color:'#bd8320' }}>
                    <i class="fa fa-copy ">
                        </i>
                        </sapn></CopyToClipboard>
                    <br />

                    {/* {item.bnb_address.substring(0, 6) + '....' + item.bnb_address.substring(item.bnb_address.length - 6)}
                    &nbsp; <CopyToClipboard text={item.bnb_address}>
                    <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color:'#bd8320' }}>
                    <i class="fa fa-copy "></i></sapn></CopyToClipboard> */}
                </>
                
            );
        }
    },
    {
        key: "refer_by",
        text: "Referrer Code",
        cell: (item) => {
            return (
                item.refer_by==""?"No Referrer":
                <>
                {item.refer_by.substring(0, 6) + '....' + item.refer_by.substring(item.refer_by.length - 6)}
                &nbsp; <CopyToClipboard text={item.refer_by}>
                    <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color:'#bd8320' }}>
                    <i class="fa fa-copy "></i></sapn></CopyToClipboard>
                </>
            );
        }
    },
    {
        key: "balance",
        text: "Purchase",
        cell: (item) => {
            return (
                `${parseFloat(item.purchase_token).toFixed(2)} BBE ~ INR ${parseFloat(item.purchase_token_usd).toFixed(2)}`
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
        text: "Login",
        cell: (item) => {
            return (
                <>

                <div class="btn-group mb-5">
                    <button type="button" class="waves-effect waves-light btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Action</button>
                    <div class="dropdown-menu" data-popper-placement="top-start" style={{position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(0px, -43px)'}}>
                        {/* <a class="dropdown-item" href="javascript:;" onClick={() => loginAsUser(item.email, 'normal')}><i className='fa fa-sign-in'></i> Dashboard Login</a> */}
                        {/* <a class="dropdown-item" href="javascript:;" onClick={() => loginAsUser(item.email, 'business')}><i className='fa fa-sign-in'></i> Business Login</a> */}
                        <a class="dropdown-item" href={`${config.baseUrl}userdetails/` + item.id} ><i className='fa fa-eye'></i> View</a>
                        <a  class="dropdown-item" href={`${config.baseUrl}userReferrals/` + item.id}><i className='fa fa-users'></i> Team</a>
                        {item.blocked === 0 ?
                        <a  class="dropdown-item" href='javascript:;' onClick={() => UserBlock(item.id)}><i className='fa fa-ban'></i> Block</a>
                        : item.blocked === 1 ?
                        <a  class="dropdown-item" href='javascript:;' onClick={()=>UserUnBlock(item.id)}><i className='fa fa-unlock'></i> Unblock</a>
                            :
                            ''
                        }
                    </div>
                </div>
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
const inputHandler = async (e) => {
    const { name, value } = e.target
    setForm((old) => {
        return { ...old, [name]: value }
    })
  }
   
// const getRegisterusersbysearch = async () => {
// let res = await getRegisterusersAction(form);
// if (res.success) {
//     setRegisterUsersHistory(res.data)   
// }
// } 
return (

    <>
        <div class="wrapper">
            {/* <div id="loader"></div> */}
            <Toaster />
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                <div className="container-full">
                    {/* Main content */}
                    <div className="content-header">
                        <div className="d-flex align-items-center">
                            <div className="me-auto">
                                <h3 className="page-title mb-5 pb-2">Users List</h3>

                            </div>

                        </div>
                        <hr />
                    </div>
                 
                    <section className="content">
                        <div className="row">
                            <div className="col-lg-12 col-12">
                            <div className='datalistbox' id='datalistboxid'>
                                        <form action="/action_page.php" method="get" id="dataformid">
                                           
                                            <form>
                                            <div className='forminner-left'>
                                            <label className="form-label">
                                                From 
                                            </label>
                                                <input type="date" id="datepickerone1" name='from_date' value={form.from_date} onChange={inputHandler}  placeholder='dd/mm/yy' required/>
                                                {/* <span>To</span> */}
                                                <label className="form-label">
                                                To 
                                            </label>
                                                <input type="date" id="datepickertwo2" name='to_date' value={form.to_date} onChange={inputHandler}  placeholder='dd/mm/yy' required/>
                                                <a href='#' onClick={getUsersList}>Search</a>
                                            </div>
                                            </form>
                                                          
                                        </form>
                                    </div>
                                <div className="box">
                                    <div className="box-header with-border">
                                        <div className='col-lg-12 mb-2'>
                                        <h4 className="box-title">Users ( {usersList.length} ) </h4>
                                        </div>
                                        <div className='btnblock'>
                                            <button className='mainbutton' onClick={getUsersListReset}>Reset</button>
                                            <button className='mainbutton' onClick={getUsersListToday}>Today</button>
                                            <button className='mainbutton' onClick={getUsersListLastWeek}>Last Week</button>
                                            <button className='mainbutton' onClick={getUsersListlastMonth}> Month</button>
                                        </div>
                                    </div>
                                    <div className="box-body">

                                {!loader ? 
                                        <ReactDatatable
                                            config={configForTable}
                                            records={usersList}
                                            columns={columns}
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
export default Users;