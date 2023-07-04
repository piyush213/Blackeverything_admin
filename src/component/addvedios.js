import React, { useEffect, useState } from 'react';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import JoditEditor from "jodit-react";
import toast, { Toaster } from 'react-hot-toast';
import config from '../coreFIles/config';
import { insertvediosAction } from '../Action/action';

const Addvedios = () => {

    const [form, setForm] = useState({vedio_link:'', title:''});
    const [validatioError, setvalidatioError] = useState({});

    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })
      }

      
      function validate() {
        let vedio_linkError = "";
        let titleError = "";
       
    
        if (form.vedio_link === '') {
          vedio_linkError = "Vedio link is required."
        }
        if (form.title === '') {
            titleError = "Title is required."
        }
        
       
        if (vedio_linkError || titleError) {
            setvalidatioError({
              vedio_linkError, titleError,
            })
            return false
        } else {
            return true
        }
    }
      const insertvedios = async (e) => {
        e.preventDefault()
        const isValid = validate();
        if (!isValid) {
    
        }
        else {
            let res = await insertvediosAction(form);
            if (res.success) {
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}Vedios`;
                }, 1200);
            } else {
                toast.error(res.msg);
            }
        }
    }

    
    return (

        <>
            <div className="wrapper">
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
                                    <h3 className="page-title mb-5 pb-2">Video</h3>
                                   
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
                                            <h4 className="box-title">Add Video</h4>
                                        </div>
                                        <div className='row mt-20 mb-50'>
                                            <div className='row'>
                                                <div className='col-md-2'>

                                                </div>
                                                <div className='col-md-8'>
                                                <div className="form-group row mb-1">
                                               
                                    
                                  <label for="recipient-name" class="col-form-label">Video<span className='stars'>*</span></label><br />
                                  
                                  <div className="col-md-12">
                                                    <input className="form-control" type="text" name="vedio_link" value={form.vedio_link} onChange={inputHandler}  placeholder="Video link"  />
                                                </div>
                                    <span className="validationErr">{validatioError.vedio_linkError}</span>
                                               
                                            </div>
                                           
                                            <div className="form-group row mb-1">
                                                <label className="col-form-label col-md-12">Title</label>
                                                <div className="col-md-12">
                                                    <input className="form-control" type="text" name="title" value={form.title} onChange={inputHandler}  placeholder="Title"  />
                                                </div>
                                                <span className="validationErr">{validatioError.titleError}</span>
                                            </div>
                                           
                                          
                                             <br />
                                             <br />
                                             
                                            <div className='text-center'>
                                                <button type="submit"  className='btn btn-primary' onClick={insertvedios}>Save</button>
                                            </div>

                                                </div>
                                                <div className='col-md-2'>

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
export default Addvedios;