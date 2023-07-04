import React, { useEffect, useState } from 'react'
// import config from '../config/config'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import { getDashboardStatisticsAction, getActivePhaseAction } from '../Action/action';

const Dashboard = () => {

  const [statistics, setStatistics] = useState({totalUsers:0, todayRegisteredUsers:0, totalSubscribers:0, totalWithdraw:0, totalStaking:0, totalSell:0, USDtotalWithdraw:0, USDtotalStaking:0, USDtotalSell:0,todaySell:0});

    useEffect(() => {
      getDashboardStatistics();
    }, []);

    const getDashboardStatistics = async () => {
        let res = await getDashboardStatisticsAction();
        if (res.success) {
          let phase = await getActivePhaseAction();
          let data = res.data;
          setStatistics((old) => {
            return { ...old, 
              'totalUsers':data.totalUsers, 
              'todayRegisteredUsers':data.todayRegisteredUsers, 
              'totalSubscribers':data.totalSubscribers,
              'totalWithdraw':data.totalWithdraw,
              'totalStaking':data.totalStaking,
              'totalSell':data.totalSell,
              'todaySell':data.todaySell,
              'weekSell':data.weekSell,
              'yearSell':data.yearSell,
              'USDtotalWithdraw':phase.data * data.totalWithdraw, //price
              'USDtotalStaking':phase.data * data.totalStaking,
              'USDtotalSell':phase.data * data.totalSell,
              'todaySellUSD':phase.data * data.todaySell,
              'weekSellUSD':phase.data * data.weekSell,
              'yearSellUSD':phase.data * data.yearSell,
            }
          })
        }
    }

    return (

        <>
        <div class="wrapper">
	        {/* <div id="loader"></div> */}
                <Header/>
                <Sidebar/>
                <div className="content-wrapper">
                  <div className="container-full">
                  <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">Dashboard</h3>
                                   
                                </div>
                            </div>
                         
                        </div>
                        {/* Content Header (Page header) */}
                    {/* Main content */}
                    <section className="content pt-0">
                      <div className="row">
                        <div className="col-xl-12 col-12">
                          <div className="row">
                            <div className="col-lg-4 col-12">
                              <div className="box">
                                <div className="box-body">
                                  <div className="no-line-chart d-flex align-items-end justify-content-between">
                                    <div>
                                      <p className="mb-0"><h4>Total Users</h4></p>
                                      <p className="mb-0">
                                      <h5>{statistics.totalUsers}</h5>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-12">
                              <div className="box">
                                <div className="box-body">
                                  <div className="no-line-chart d-flex align-items-end justify-content-between">
                                    <div>
                                    <p className="mb-0"><h4>Today Registered</h4></p>
                                      <p className="mb-0">
                                      <h5>{statistics.todayRegisteredUsers}</h5>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-12">
                              <div className="box">
                                <div className="box-body">
                                  <div className="no-line-chart d-flex align-items-end justify-content-between">
                                    <div>
                                    <p className="mb-0"><h4>Total Subscribers</h4></p>
                                      <p className="mb-0">
                                      <h5>{ statistics.totalSubscribers }</h5>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-12">
                              <div className="box">
                                <div className="box-body">
                                  <div className="no-line-chart d-flex align-items-end justify-content-between">
                                    <div>
                                    <p className="mb-0"><h4>Total Withdraw</h4></p>
                                      <p className="mb-0">
                                      <h5>{statistics.totalWithdraw?parseFloat(statistics.totalWithdraw).toFixed(2):"0"} BBE ~ <small>INR{statistics.USDtotalWithdraw?parseFloat(statistics.USDtotalWithdraw).toFixed(2):"0"}</small></h5>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <div className="col-lg-4 col-12">
                              <div className="box">
                                <div className="box-body">
                                  <div className="no-line-chart d-flex align-items-end justify-content-between">
                                    <div>
                                    <p className="mb-0"><h4>Total Staking</h4></p>
                                      <p className="mb-0">
                                      <h5>{parseFloat(statistics.totalStaking).toFixed(2)} BBE
                                      ~ <small>INR{statistics.USDtotalStaking?parseFloat(statistics.USDtotalStaking).toFixed(2):"0"}</small></h5>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> */}

                            <div className="col-lg-4 col-12">
                              <div className="box">
                                <div className="box-body">
                                  <div className="no-line-chart d-flex align-items-end justify-content-between">
                                    <div>
                                    <p className="mb-0"><h4>Total Sale</h4></p>
                                      <p className="mb-0">
                                      <h5>{parseFloat(statistics.totalSell).toFixed(2)} BBE
                                      ~ <small>INR{statistics.USDtotalSell?parseFloat(statistics.USDtotalSell).toFixed(2):"0"}</small></h5>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4 col-12">
                              <div className="box">
                                <div className="box-body">
                                  <div className="no-line-chart d-flex align-items-end justify-content-between">
                                    <div>
                                    <p className="mb-0"><h4> Today Sale </h4></p>
                                      <p className="mb-0">
                                      <h5>{parseFloat(statistics.todaySell).toFixed(2)} BBE
                                      ~ <small>INR{statistics.todaySellUSD?parseFloat(statistics.todaySellUSD).toFixed(2):"0"}</small>
                                       </h5>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4 col-12">
                              <div className="box">
                                <div className="box-body">
                                  <div className="no-line-chart d-flex align-items-end justify-content-between">
                                    <div>
                                    <p className="mb-0"><h4>Last Week Sale</h4></p>
                                      <p className="mb-0">
                                      <h5>{parseFloat(statistics.weekSell).toFixed(2)} BBE
                                      ~ <small>INR{statistics.weekSellUSD?parseFloat(statistics.weekSellUSD).toFixed(2):"0"}</small>
                                      </h5>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4 col-12">
                              <div className="box">
                                <div className="box-body">
                                  <div className="no-line-chart d-flex align-items-end justify-content-between">
                                    <div>
                                    <p className="mb-0"><h4>Last Month Sale</h4></p>
                                      <p className="mb-0">
                                      <h5>{parseFloat(statistics.yearSell).toFixed(2)} BBE
                                      ~ <small>INR{statistics.yearSellUSD?parseFloat(statistics.yearSellUSD).toFixed(2):"0"}</small>
                                       </h5>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>


                          </div>
                          {/* <div className="box">
                            <div className="box-body bb-1 d-lg-block d-none bbsr-0 bber-0">
                              <div className="d-flex justify-content-between align-items-center">
                                <h3 className="my-0">
                                  <span className="text-primary">ETH</span> /{" "}
                                  <span className="text-info">BTC</span>
                                </h3>
                                <div>
                                  <h5 className="mb-0">
                                    <span className="me-5">Last:</span>
                                  </h5>
                                  <h5 className="text-primary mb-0">0.03242000</h5>
                                </div>
                                <div>
                                  <h5 className="mb-0">
                                    <span className="me-5">24High:</span>
                                  </h5>
                                  <h5 className="text-success mb-0">0.03301357</h5>
                                </div>
                                <div>
                                  <h5 className="mb-0">
                                    <span className="me-5">24Low:</span>
                                  </h5>
                                  <h5 className="text-danger mb-0">0.03089614</h5>
                                </div>
                                <div>
                                  <h5 className="mb-0">
                                    <span className="me-5">24V:</span>
                                  </h5>
                                  <h5 className="text-info mb-0">1001.66 BTC</h5>
                                </div>
                              </div>
                            </div>
                            <div className="box-body">
                              <div id="bitcoin-stock" className="mb-15" />
                            </div>
                          </div>
                          <div className="box">
                            <div className="box-header with-border">
                              <h4 className="box-title">Transactions History</h4>
                            </div>
                            <div className="box-body">
                              <div className="table-responsive">
                                <table className="table no-margin table-hover">
                                  <thead>
                                    <tr>
                                      <th>Transaction Hash</th>
                                      <th>BTC</th>
                                      <th>Time</th>
                                      <th>Miner Preference</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <a href="#" className="text-warning hover-warning">
                                          7d2c7b06afa0
                                        </a>
                                        ...
                                      </td>
                                      <td>1.0126281 BTC</td>
                                      <td>
                                        <time
                                          className="timeago"
                                          dateTime="2018-02-01T13:38:01Z"
                                          title="2018-02-01 13:38 GMT"
                                        >
                                          2 minutes ago
                                        </time>
                                      </td>
                                      <td>medium</td>
                                      <td>
                                        <span className="label label-success">Confirmed</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a href="#" className="text-warning hover-warning">
                                          5de67405bfc6
                                        </a>
                                        ...
                                      </td>
                                      <td>0.10522881 BTC</td>
                                      <td>
                                        <time
                                          className="timeago"
                                          dateTime="2018-02-01T13:38:01Z"
                                          title="2018-02-01 13:38 GMT"
                                        >
                                          2 minutes ago
                                        </time>
                                      </td>
                                      <td>high</td>
                                      <td>
                                        <span className="label label-warning">Unconfirmed</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a href="#" className="text-warning hover-warning">
                                          583de1b0cec
                                        </a>
                                        ...
                                      </td>
                                      <td>0.40622033 BTC</td>
                                      <td>
                                        <time
                                          className="timeago"
                                          dateTime="2018-02-01T13:38:01Z"
                                          title="2018-02-01 13:38 GMT"
                                        >
                                          2 minutes ago
                                        </time>
                                      </td>
                                      <td>high</td>
                                      <td>
                                        <span className="label label-success">Confirmed</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a href="#" className="text-warning hover-warning">
                                          5493bcfa5f7f
                                        </a>
                                        ...
                                      </td>
                                      <td>4.43670578 BTC</td>
                                      <td>
                                        <time
                                          className="timeago"
                                          dateTime="2018-02-01T13:38:00Z"
                                          title="2018-02-01 13:38 GMT"
                                        >
                                          2 minutes ago
                                        </time>
                                      </td>
                                      <td>high</td>
                                      <td>
                                        <span className="label label-danger">Canceled</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a href="#" className="text-warning hover-warning">
                                          4d66087926b5
                                        </a>
                                        ...
                                      </td>
                                      <td>22.01099978 BTC</td>
                                      <td>
                                        <time
                                          className="timeago"
                                          dateTime="2018-02-01T13:38:00Z"
                                          title="2018-02-01 13:38 GMT"
                                        >
                                          2 minutes ago
                                        </time>
                                      </td>
                                      <td>high</td>
                                      <td>
                                        <span className="label label-danger">Canceled</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a href="#" className="text-warning hover-warning">
                                          60935e53c894
                                        </a>
                                        ...
                                      </td>
                                      <td>0.0024534 BTC</td>
                                      <td>
                                        <time
                                          className="timeago"
                                          dateTime="2018-02-01T13:38:00Z"
                                          title="2018-02-01 13:38 GMT"
                                        >
                                          2 minutes ago
                                        </time>
                                      </td>
                                      <td>high</td>
                                      <td>
                                        <span className="label label-warning">Unconfirmed</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a href="#" className="text-warning hover-warning">
                                          b1236b76cf5e
                                        </a>
                                        ...
                                      </td>
                                      <td>0.00518486 BTC</td>
                                      <td>
                                        <time
                                          className="timeago"
                                          dateTime="2018-02-01T13:37:59Z"
                                          title="2018-02-01 13:37 GMT"
                                        >
                                          2 minutes ago
                                        </time>
                                      </td>
                                      <td>medium</td>
                                      <td>
                                        <span className="label label-success">Confirmed</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <a href="#" className="text-warning hover-warning">
                                          d261fb1d717d
                                        </a>
                                        ...
                                      </td>
                                      <td>0.0281818 BTC</td>
                                      <td>
                                        <time
                                          className="timeago"
                                          dateTime="2018-02-01T13:37:58Z"
                                          title="2018-02-01 13:37 GMT"
                                        >
                                          2 minutes ago
                                        </time>
                                      </td>
                                      <td>high</td>
                                      <td>
                                        <span className="label label-danger">Canceled</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div> */}
                          
                        </div>
                       
                        {/* <div className="col-12">
                          <div className="box">
                            <div className="box-body">
                              <ul id="webticker-1">
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">BCH/BTC</h5>
                                      <p className="text-danger">-2.24%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$0.04886</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">REP/USD</h5>
                                      <p className="text-danger">-2.57%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$20.12</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">EOS/USD</h5>
                                      <p className="text-success">+1.54%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$4.755</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">ZRX/USD</h5>
                                      <p className="text-danger">-1.33%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$0.26877</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">ETH/USD</h5>
                                      <p className="text-success">+0.57%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$159.73</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">LTC/USD</h5>
                                      <p className="text-success">+1.30%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$73.42</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">ETC/USD</h5>
                                      <p className="text-danger">-0.19%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$5.719</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">BCH/USD</h5>
                                      <p className="text-success">+0.42%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$267.72</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">XRP/USD</h5>
                                      <p className="text-danger">-0.50%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$0.2974</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">BTC/USD</h5>
                                      <p className="text-success">+3.15%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$5,497.49</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">REP/USD</h5>
                                      <p className="text-danger">-2.52%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$20.13</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">EOS/USD</h5>
                                      <p className="text-success">+1.58%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$4.757</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">ZRX/USD</h5>
                                      <p className="text-danger">-2.07%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$0.268135</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">ETH/USD</h5>
                                      <p className="text-success">+0.47%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$159.55</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">LTC/USD</h5>
                                      <p className="text-success">+1.28%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$73.40</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">ETC/USD</h5>
                                      <p className="text-danger">-0.44%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$5.715</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">BCH/USD</h5>
                                      <p className="text-success">+0.43%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$268.00</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">XRP/USD</h5>
                                      <p className="text-danger">-0.54%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$0.2970</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">BTC/USD</h5>
                                      <p className="text-success">+3.00%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$5,490.01</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="be-1">
                                  <div className="mx-20">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="me-40">XLM/USD</h5>
                                      <p className="text-danger">-0.97%</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <h4 className="my-0 me-40">$0.099065</h4>
                                      <span className="sparklines">
                                        8,4,0,0,1,4,4,10,10,0,0,4,6,5,9,10
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </section>
                    {/* /.content */}
                  </div>
                </div>

                <Footer/>
           </div>
        </>


)

}
export default Dashboard;