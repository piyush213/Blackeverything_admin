import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import ReactDatatable from '@ashvin27/react-datatable'
import Web3 from 'web3'
import BigNumber from "bignumber.js";

import { getWithdrawalStatisticsAction, getMntWithdrawalHistoryAction, approveWithdrwalRequestAction, rejectWithdrwalRequestAction, getActivePhaseAction } from '../Action/action';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Withdrawal = () => {
    var web3 = new Web3(window.ethereum);

    const [withdrawalHistory, setWithdrawalHistory] = useState({});
    const [form, setForm] = useState({});

    const loginData = (!Cookies.get('loginSuccessBlackeverythingAdmin')) ? [] : JSON.parse(Cookies.get('loginSuccessBlackeverythingAdmin'));

    const [statistics, setStatistics] = useState({ pendingTokenAmount: 0, pendingBNBAmount: 0, approvedTokenAmount: 0, approvedBNBAmount: 0, rejectedTokenAmount: 0, rejectedBNBAmount: 0, pendingUSDAmount: 0, approvedUSDAmount: 0, rejectedUSDAmount: 0 });
    const [loader, setLoader] = useState(true);
    const [ownerAddress, setOwnerAddress] = useState('')
    const [decimals, setDecimals] = useState(0)
    const [ownerBalance, setOwnerBalance] = useState(0)
    const [connectedWallet, setConnectedWallet] = useState('')



    useEffect(() => {
        getWithdrawalStatistics();
        getWithdrawalHistory();
        contractDetails();
        switchAccount()

    }, []);


    const switchAccount = async()=>{
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
       }


    const contractDetails = async () => {
        let Contract = new web3.eth.Contract(
            config.constractABI,
            config.constractAddress
        );
        
        let owner = await Contract.methods.owner().call();
        setOwnerAddress(owner)
        console.log(owner)
        let decimals1 = await Contract.methods.decimals().call();
        setDecimals(decimals1)
        let balanceOf = await Contract.methods.balanceOf(owner).call();
        balanceOf = balanceOf / 10**decimals1
        setOwnerBalance(balanceOf)

    }

    const getWithdrawalStatistics = async () => {
        setLoader(true)
        let res = await getWithdrawalStatisticsAction();
        if (res.success) {
            setLoader(false)
            let phase = await getActivePhaseAction();
            let data = res.data;
            setStatistics((old) => {
                return {
                    ...old,
                    'pendingTokenAmount': data.pendingTokenAmount,
                    'pendingBNBAmount': data.pendingBNBAmount,
                    'approvedTokenAmount': data.approvedTokenAmount,
                    'approvedBNBAmount': data.approvedBNBAmount,
                    'rejectedTokenAmount': data.rejectedTokenAmount,
                    'rejectedBNBAmount': data.rejectedBNBAmount,
                    'pendingUSDAmount': parseFloat(data.pendingTokenAmount * phase.data.price).toFixed(2),
                    'approvedUSDAmount': parseFloat(data.approvedTokenAmount * phase.data.price).toFixed(2),
                    'rejectedUSDAmount': parseFloat(data.rejectedTokenAmount * phase.data.price).toFixed(2),
                }
            })
        }
    }

    const copieBtn = async () => {
        toast.success(`Coppied!!`);
    }

    const getWithdrawalHistory = async () => {
        setLoader(true)
        let res = await getMntWithdrawalHistoryAction();
        console.log("getMntWithdrawalHistoryAction", res.data);
        if (res.success) {
            setLoader(false)
            setWithdrawalHistory(res.data)
        }
    }

    const columns = [
        {
            key: "Sno.",
            text: "Sno.",
            cell: (row, index) => index + 1
        },
        {
            key: "email",
            text: "User",
            cell: (item) => {
                return (
                    <>
                        <a target="__blank" href={`${config.baseUrl}userdetails/` + item.user_id} > {item.email}</a>
                        &nbsp; <CopyToClipboard text={item.email}>
                            <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: '#bd8320' }}>
                            </sapn></CopyToClipboard>
                    </>
                );
            }
        },
        {
            key: "account_number",
            text: "Account Number",
            cell: (item) => {
                return (
                    <>
                        <a target="__blank" href={`${config.baseUrl}userdetails/` + item.user_id} > {item.account_number}</a>
                        &nbsp; <CopyToClipboard text={item.account_number}>
                            <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: '#bd8320' }}>
                            </sapn></CopyToClipboard>
                    </>
                );
            }
        },
        {
            key: "bank_name",
            text: "Bank Name",
            cell: (item) => {
                return (
                    <>
                        <a target="__blank" href={`${config.baseUrl}userdetails/` + item.user_id} > {item.bank_name}</a>
                        &nbsp; <CopyToClipboard text={item.bank_name}>
                            <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: '#bd8320' }}>
                            </sapn></CopyToClipboard>
                    </>
                );
            }
        },
        {
            key: "ifsc_code",
            text: "IFSC Code",
            cell: (item) => {
                return (
                    <>
                        <a target="__blank" href={`${config.baseUrl}userdetails/` + item.user_id} > {item.ifsc_code}</a>
                        &nbsp; <CopyToClipboard text={item.ifsc_code}>
                            <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: '#bd8320' }}>
                            </sapn></CopyToClipboard>
                    </>
                );
            }
        },

        {
            key: "amount",
            text: "Received Amount (INR)",
            cell: (item) => {
                return (
                    <>
                        {item.bnb_amount}
                        INR
                        &nbsp; <CopyToClipboard text={item.bnb_amount}>
                            <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: '#bd8320' }}>
                            </sapn></CopyToClipboard>
                    </>
                );
            }
        },
        {
            key: "amount",
            text: "Total Amount (BBE)",
            cell: (item) => {
                return (
                    `${parseFloat(item.amount).toFixed(2)} BBE 
                    `

                );
            }
            // ~ INR ${parseFloat(item.amountUSD).toFixed(2)} 

        },
        {
            key: "created_at",
            text: "Request Date",
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
                        {item.status == 0 ?
                            // loginData.role == 1 ? 
                            // <>
                            // <button onClick={() => approveWithdrwalRequest(item.id)}  type="button" className='btn btn-sm btn-primary'  >Approve</button> &nbsp; 
                            // <button onClick={() => rejectWithdrwalRequest(item.id)} type="button" className='btn btn-sm btn-danger' >Reject</button>
                            // </>
                            // :

                            <>
                                {
                                    <>
                                        <button onClick={() => approveWithdrwalRequest(item.id, item.email,item.amount)} type="button" className='btn btn-sm btn-primary'  >Approve</button> &nbsp;
                                        <button onClick={() => rejectWithdrwalRequest(item.id)} type="button" className='btn btn-sm btn-danger' >Reject</button>
                                    </>
                                }
                            </>
                            :
                            ''
                        }
                        {item.status == 1 ?
                            <b className='approved_cls'>Approved</b>
                            :
                            ''
                        }
                        {item.status == 2 ?
                            <b className='rejected_cls'>Rejected</b>
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
            excel: true,
            print: false

        }
    }



    const notAllowWarning = async (id) => {
        Swal.fire({
            title: 'Warning',
            text: "You are authorised to approve or reject request!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then(async (result) => {

        })
    }

    const approveWithdrwalRequest = async (id, email,amount,userAddress) => {
        console.log(connectedWallet)
        if(connectedWallet.length <0){
            toast.error("Please Connect Wallet")

            return
        }
        if(ownerBalance<amount){
            toast.error("insufficient Balance")

            return
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to approve this request!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                userAddress = "0x7B8558da7f9E043288aaaF652cF271428c4f98A9"
let result = await transferToken(amount,userAddress)
if(result){
    form.request_id = id;
    form.email = email;
    let res = await approveWithdrwalRequestAction(form);
    if (res.success) {
        getWithdrawalHistory();
        // toast.success(res.msg);
        Swal.fire(
            'Approved!',
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
             
            }
        })
    }
 const transferToken = async (amount,userAddress) => {
    try{
        let contract = new web3.eth.Contract(
            config.constractABI,
            config.constractAddress
        );
        console.log(amount)
        amount = amount * 10 ** decimals
        console.log(amount)

        amount = amount.toString();
        console.log(amount)

        //amount =  BigNumber(amount)
       // console.log(amount)

        let transferTokenTrx = await contract.methods.transfer(userAddress,amount);
    
        let encoded_tx = transferTokenTrx.encodeABI();
    
        let gasPrice = await web3.eth.getGasPrice();
    
        let gasLimit = await web3.eth.estimateGas({
          gasPrice: web3.utils.toHex(gasPrice),
          to: config.constractAddress,
          from: connectedWallet,
          data: encoded_tx,
        });
    
        let trx = await web3.eth.sendTransaction({
          gasPrice: web3.utils.toHex(gasPrice),
          gas: web3.utils.toHex(gasLimit),
          to: config.constractAddress,
          from: connectedWallet,
          data: encoded_tx,
        });
        if (trx.transactionHash) {
          return true;
        }else{
            return false
        }
    }catch(e){
        toast.error(e.message)

        return false
    }
   
  };
    const rejectWithdrwalRequest = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to reject this request!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Reject it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                form.request_id = id;
                let res = await rejectWithdrwalRequestAction(form);
                if (res.success) {
                    getWithdrawalHistory();
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




    const connectWallet = async (e) => {
        e.preventDefault();
        if(!window.ethereum){
            toast.error("Please Install metamask")
        }else{
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
          if(accounts[0].toUpperCase() != ownerAddress.toUpperCase()){
        toast.error("Connected wallet is not owner address. Please Switch to owner address")
        
          }else{
            setConnectedWallet(accounts[0])
          }

        }

    }

    return (

        <>
            <div class="wrapper">
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
                                    <h3 className="page-title mb-5 pb-2">Withdrawal Request</h3>
                                    {/* <p>Note : before pressing approve button please login to metamask with your main admin eth address</p> */}

                                </div>
                            </div>
                            <hr />
                        </div>
                        {/* Content Header (Page header) */}

                        {/* Main content */}
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <h4>
                                        Total pending amount :  {statistics.pendingBNBAmount ? parseFloat(statistics.pendingBNBAmount).toFixed(2) : '0'} INR ( {statistics.pendingTokenAmount ? parseFloat(statistics.pendingTokenAmount).toFixed(2) : '0'} BBE ~ INR {statistics.pendingUSDAmount} )
                                    </h4>
                                    <h4>
                                        Total approved amount :  {statistics.approvedBNBAmount ? parseFloat(statistics.approvedBNBAmount).toFixed(2) : '0'} INR ( {statistics.approvedTokenAmount ? parseFloat(statistics.approvedTokenAmount).toFixed(2) : '0'} BBE ~ INR {statistics.approvedUSDAmount} )
                                    </h4>
                                    <h4>
                                        Total rejected amount :  {statistics.rejectedBNBAmount ? parseFloat(statistics.rejectedBNBAmount).toFixed(2) : '0'} INR  ( {statistics.rejectedTokenAmount ? parseFloat(statistics.rejectedTokenAmount).toFixed(2) : '0'} BBE ~ INR {statistics.rejectedUSDAmount} )
                                    </h4>
                                   {connectedWallet.length>0?
                                   <p>COnnected Wallet : {connectedWallet}</p>
                                   :
                                    <button className='btn btn-primary' onClick={(e) => connectWallet(e)}>CONNECT WALLET</button>}
                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h4 className="box-title">Withdrawal</h4>
                                        </div>
                                        <div className="box-body">
                                            {!loader ?
                                                <ReactDatatable
                                                    config={configForTable}
                                                    records={withdrawalHistory}
                                                    columns={columns}
                                                />
                                                :
                                                <>
                                                    <br />
                                                    <br />
                                                    <center><h4><i className='fa fa-spinner fa-spin'></i> &nbsp; Please wait</h4></center>
                                                    <br />
                                                    <br />
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
export default Withdrawal;