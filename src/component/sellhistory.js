import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import ReactDatatable from '@ashvin27/react-datatable'
import { getTransactionHistoryAction, getActivePhaseAction } from '../Action/action';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Sellhistory = () => {
    const [form,setForm]=useState({type:3, from_date:'',to_date:''});
    const [totalSellMNT,setTotalSellMNT]=useState(0);
    const [totalSellUSDT,setTotalSellUSDT]=useState(0);
    const [transactionHistory, setTransactionHistory] = useState({});
    const [transactionHistoryMain, setTransactionHistoryMain] = useState({});
    const [price, setPrice] = useState(0);
    const[loader,setLoader]=useState(true);
    
    useEffect(() => {
        getTransactionHistory();
    }, []);

    const getTransactionHistory = async () => {
        setLoader(true)
        form.type=3;
        let res = await getTransactionHistoryAction(form);
        let phase = await getActivePhaseAction();
        setPrice(phase.data.price);
       
        if (res.success) {
            setLoader(false)
            setTransactionHistory(res.data)
            setTotalSellMNT(res.data[0].totalSale)
            setTotalSellUSDT(res.data[0].totalSaleUSD)
        }
    }
    const getTransactionHistoryReset = async () => {
        getTransactionHistory();
    }

    const getTransactionHistoryToday=async()=>{
        setLoader(true)
        form.type=1;
        let res = await getTransactionHistoryAction(form);
        setTotalSellMNT(0)
        setTotalSellUSDT(0)
        if (res.success) {
            setLoader(false)
            setTransactionHistory(res.data)
            setTotalSellMNT(res.data[0].totalSale)
            setTotalSellUSDT(res.data[0].totalSaleUSD)
        }

        }
       
const getTransactionHistorybysearch = async () => {
    setLoader(true)
    form.type=2;
    if(form.from_date == "") { toast.error(`Please select from date!`); return; }
    if(form.to_date == "") { toast.error(`Please select to date!`); return; }
    let res = await getTransactionHistoryAction(form);
    setTotalSellMNT(0)
    setTotalSellUSDT(0)
    if (res.success) {
        setLoader(false)
        setTransactionHistory(res.data)
        setTotalSellMNT(res.data[0].totalSale)
        setTotalSellUSDT(res.data[0].totalSaleUSD)
    }

   
}   

    const copieBtn = async () => {
        toast.success(`Coppied!!`);
    }

    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })
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
                        <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color:'#bd8320' }}>
                        <i class="fa fa-copy "></i></sapn></CopyToClipboard>
                    </>
                );
            }
        },
        {
            key: "amount",
            text: "Amount (INR)",
            cell: (item) => {
                return (
                    `${parseFloat(item.amount).toFixed(2)} INR`
                );
            }
        },
        {
            key: "token",
            text: "Amount (BBE)",
            cell: (item) => {
                return (
                    `${parseFloat(item.token).toFixed(2)} BBE ~ INR ${parseFloat(item.usd_amount).toFixed(2)} `
                );
            }
        },
        {
            key: "phase",
            text: "Phase",
            cell: (item) => {
                return (
                    `${item.phase_name}`
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
        // {
        //     key: "transactionHash",
        //     text: "Action",
        //     cell: (item) => {
        //         return (
        //             <>
        //             { item.status == 0 ?
        //                 <a target='__blank' href={`https://bscscan.com/tx/${item.transactionHash}`} className='btn btn btn-primary btn-sm'>Blockchain View</a>
        //                 :
        //                 ''
        //             }
        //             </>
                    
        //         );
        //     }
        // },
        {
            key: "status",
            text: "Status",
            cell: (item) => {
                return (
                    <>
                    { item.status == 0 ?
                        <b>Active</b>
                        : item.status == 1 ?
                        <b className='approved_cls'>Approved</b> :<b className='Primary'>Rejected</b>
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

    return (

        <>
            <div class="wrapper">
                {/* <div id="loader"></div> */}
                <Toaster/>
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        {/* Main content */}
                        <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">Sale History</h3>

                                </div>
                                

                            </div>
                            <hr />
                        </div>
                        {/* Content Header (Page header) */}

                        {/* Main content */}
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <div className='datalistbox' id='datalistboxid'>
                                        <form action="" method="get" id="dataformid">
                                            <div className='formbtndiv'>
                                                <a href='#' onClick={getTransactionHistoryToday}>Today Sale</a>
                                            </div>
                                            <div className='formbtndiv'>
                                            <a href='#' onClick={getTransactionHistoryReset}>Reset</a>
                                            </div>
                                            <form className='mobile-btm'>
                                            <div className='forminner-left'>
                                            <label className="form-label">
                                                From 
                                            </label>
                                                <input type="date" id="datepickerone1" name='from_date' value={form.from_date} onInput={inputHandler} placeholder='dd/mm/yy'/>
                                                {/* <span>To</span> */}
                                                <label className="form-label">
                                                To 
                                            </label>
                                                <input type="date" id="datepickertwo2" name='to_date' value={form.to_date} onChange={inputHandler} placeholder='dd/mm/yy'/>
                                                <a href='#' onClick={getTransactionHistorybysearch}>Search</a>
                                            </div>
                                            </form>
                                           
                                            

                                            
                                        </form>
                                    </div>
                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h4 className="box-title">Sale History</h4>
                                            <span className='pull-right'>
                                                <h5>Total Sell : {totalSellMNT} BBE~ INR {totalSellUSDT}</h5> 
                                            </span>
                                        </div>
                                    
                                        <div className="box-body">
                                            {!loader ?
                                            <ReactDatatable
                                                config={configForTable}
                                                records={transactionHistory}
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
export default Sellhistory;