import React, { Component } from 'react'
// import config from '../config/config'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
const Stakingsetting = () => {


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
                                    <h3 className="page-title mb-5 pb-2">Settings</h3>
                                   
                                </div>
                            </div>
                            <hr/>
                        </div>
                        {/* Content Header (Page header) */}

                        {/* Main content */}
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <div className="box">
                                    <div className="box-header with-border">
                                            <h4 className="box-title">Stacking</h4>
                                        </div>
                                        <div className='row mt-20 mb-20'>
                                            <div className='row'>
                                                <div className='col-md-3'>

                                                </div>
                                                <div className='col-md-6'>
                                                <div class="form-group row mb-2">
                                                <label class="col-form-label col-md-12">180 Days Minimum Staking</label>
                                                <div class="col-md-12">
                                                    <input class="form-control" type="text" name="name"   />
                                                </div>
                                            </div>
                                            <div class="form-group row mb-2">
                                                <label class="col-form-label col-md-12">360 Days Minimum Staking </label>
                                                <div class="col-md-12">
                                                    <input class="form-control" type="text" name="name"  />
                                                </div>
                                            </div>
                                            <div class="form-group row mb-2">
                                                <label class="col-form-label col-md-12">720 Days Minimum Staking </label>
                                                <div class="col-md-12">
                                                    <input class="form-control" type="text" name="name"  />
                                                </div>
                                            </div>
                                            <div class="form-group row mb-2">
                                                <label class="col-form-label col-md-12">180 Days ROI Percentage (%) </label>
                                                <div class="col-md-12">
                                                    <input class="form-control" type="text" name="name"  />
                                                </div>
                                            </div>
                                            <div class="form-group row mb-2">
                                                <label class="col-form-label col-md-12">360 Days ROI Percentage (%)</label>
                                                <div class="col-md-12">
                                                    <input class="form-control" type="text" name="name"  />
                                                </div>
                                            </div>
                                            <div class="form-group row mb-4">
                                                <label class="col-form-label col-md-12">720 Days ROI Percentage (%)</label>
                                                <div class="col-md-12">
                                                    <input class="form-control" type="text" name="name"  />
                                                </div>
                                            </div>
                                            <div className='text-center'>
                                                <button className='btn btn-primary'>Update Now</button>
                                            </div>

                                                </div>
                                                <div className='col-md-3'>

                                                </div>

                                            </div>
                                           

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                        {/* /.content */}
                    </div>
                </div>

                <Footer />
            </div>
        </>


    )

}
export default Stakingsetting;