import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import ReactDatatable from '@ashvin27/react-datatable'
import { getStackingHistoryAction } from '../Action/action';
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Stakinghistory = () => {
    const [form, setForm] = useState({ type: 3, from_date: '', to_date: '' });
    const [totalStakingMNT, setTotalStakingMNT] = useState(0);
    const [totalStakingUSDT, setTotalStakingUSDT] = useState(0);
    const [stackingHistory, setStackingHistory] = useState({});
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        getStackingHistory();
    }, []);

    const getStackingHistory = async () => {
        setLoader(true)
        form.type = 3;
        let res = await getStackingHistoryAction(form);
        if (res.success) {
            setLoader(false)
            setStackingHistory(res.data)
            console.log("123456",res.data[0]);
            setTotalStakingMNT(res.data[0].totalStaking)
            setTotalStakingUSDT(res.data[0].totalStakingUSD)
        }
    }

    const getStackingHistoryreset = async () => {
        getStackingHistory();
    }


    const getStackingHistoryToday = async () => {
        setLoader(true)
        form.type = 1;
        let res = await getStackingHistoryAction(form);
        setTotalStakingMNT(0)
        setTotalStakingUSDT(0)
        if (res.success) {
            setLoader(false)
            setStackingHistory(res.data)
            setTotalStakingMNT(res.data[0].totalStaking)
            setTotalStakingUSDT(res.data[0].totalStakingUSD)
        }

    }

    const getStackingHistorybysearch = async () => {
        setLoader(true)
        form.type = 2;
        if (form.from_date == "") { toast.error(`Please select from date!`); return; }
        if (form.to_date == "") { toast.error(`Please select to date!`); return; }
        let res = await getStackingHistoryAction(form);
        setTotalStakingMNT(0)
        setTotalStakingUSDT(0)
        if (res.success) {
            setLoader(false)
            setStackingHistory(res.data)
            setTotalStakingMNT(res.data[0].totalStaking)
            setTotalStakingUSDT(res.data[0].totalStakingUSD)
        }
    }

    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
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
                        <a target="__blank" href={`${config.baseUrl}userdetails/` + item.user_id} > {item.email} </a>

                        &nbsp; <CopyToClipboard text={item.email}>
                            <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: '#bd8320' }}>
                                <i class="fa fa-copy "></i></sapn></CopyToClipboard>
                    </>
                );
            }
        },
        {
            key: "amount",
            text: "Amount (BBE)",
            cell: (item) => {
                return (
                    `${parseFloat(item.amount).toFixed(2)} BBE ~ INR ${parseFloat(item.usd_amount).toFixed(2)}`
                );
            }
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
                return (
                    `${item.period} Days`
                );
            }
        },
        {
            key: "apy",
            text: "Staking (%)",
            cell: (item) => {
                return (
                    `${item.apy}%`
                );
            }
        },
        // {
        //     key: "remaning",
        //     text: "Month Passed",
        //     cell: (item) => {
        //         return (
        //             `${item.period - item.remaining} Month`
        //         );
        //     }
        // },
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
            key: "action",
            text: "Action",
            cell: (item) => {
                return (
                    <>
                        <b className='approved_cls'>Active</b>
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
                <Toaster />
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        {/* Main content */}
                        <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">Staking History</h3>

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
                                        <form action="/action_page.php" method="get" id="dataformid">
                                            <div className='formbtndiv'>
                                                {/* <a href='#' onClick={getStackingHistoryToday}>Today Staking</a> */}
                                            </div>
                                            <div className='formbtndiv'>
                                                {/* <a href='#' onClick={getStackingHistoryreset}>Reset</a> */}
                                            </div>
                                            {/* <form>
                                                <div className='forminner-left'>
                                                    <label className="form-label">
                                                        From
                                                    </label>
                                                    <input type="date" id="datepickerone1" name='from_date' value={form.from_date} onInput={inputHandler} placeholder='dd/mm/yy' />
                                                    <span>To</span>
                                                    <label className="form-label">
                                                        To
                                                    </label>
                                                    <input type="date" id="datepickertwo2" name='to_date' value={form.to_date} onInput={inputHandler} placeholder='dd/mm/yy' />
                                                    <a href='#' onClick={getStackingHistorybysearch}>Search</a>
                                                </div>
                                            </form> */}




                                        </form>
                                    </div>

                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h4 className="box-title">Staking History</h4>
                                            <span className='pull-right'>
                                                <h5>Total Staking : {totalStakingMNT} BBE~ INR{totalStakingMNT}</h5>
                                            </span>
                                        </div>
                                        <div className="box-body">

                                            {!loader ?
                                                <ReactDatatable
                                                    config={configForTable}
                                                    records={stackingHistory}
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
export default Stakinghistory;