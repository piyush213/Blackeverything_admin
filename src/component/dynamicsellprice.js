import React, { Component } from 'react'
// import config from '../config/config'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
const Dynamicsellprice = () => {


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
                                    <h3 className="page-title mb-5 pb-2">Dynamic Sell System</h3>

                                </div>

                            </div>
                            <hr />
                        </div>
                        {/* Content Header (Page header) */}

                        {/* Main content */}
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h4 className="box-title">Dynamic Sell System</h4>
                                        </div>
                                        <div className="box-body">
                                            <div className="table-responsive">
                                                <table className="table no-margin table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>0-500$</th>
                                                            <th>500-1000$</th>
                                                            <th>1000$-1500$</th>
                                                            <th>1500$-2000$</th>
                                                            <th>2000$-3000$</th>
                                                            <th>3000$-4000$</th>
                                                            <th>4000$-Above</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr class="">
                                                            <td class="">1</td>
                                                            <td class="">0.5$</td>
                                                            <td class="">0.5$</td>
                                                            <td class="">0.5$</td>
                                                            <td class="">0.5$</td>
                                                            <td class="">0.5$</td>
                                                            <td class="">0.5$</td>
                                                            <td class="">0.5$</td>
                                                            <td class=""><a href="#" class="text-primary"> <span class="fa fa-edit"></span> Edit </a></td>
                                                        </tr>


                                                    </tbody>
                                                </table>
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
export default Dynamicsellprice;