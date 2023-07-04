import React, { useEffect, useState } from 'react';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import config from '../coreFIles/config';
import { updatevediosAction,getvedioidAction } from '../Action/action';
import toast, { Toaster } from 'react-hot-toast';

const Updatevedios = () => {
    const [gevediosidlist, setVediosidList] = useState({});
    const [form, setForm] = useState({id:'',title:'',vedio_link:'',});
    useEffect(() => {
        getvedioseid();
    }, []);

    const getvedioseid=async () => {
        const id = window.location.href.split("/").pop();
        let res = await getvedioidAction({'id':id});
        if (res.success) {
            setVediosidList(res.data)
            let data = res.data[0];
            setForm((old) => {
                return { ...old,"id":id,'title':data.title,'vedio_link':data.vedio_link}
            })
        }
        console.log(res.success)
    }
    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })
      }
        
      const updatevedios = async (e) => {
        e.preventDefault()
            let res = await updatevediosAction(form);
            if (res.success) {
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.href =`${config.baseUrl}Vedios`;
                }, 1200);
            } else {
                toast.error(res.msg);
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
                                            <h4 className="box-title">Edit Video</h4>
                                        </div>
                                        <div className='row mt-20 mb-50'>
                                            <div className='row'>
                                                <div className='col-md-2'>

                                                </div>
                                                <div className='col-md-8'>

                                                <div class="form-group row mb-1">
                                                <label for="recipient-name" class="col-form-label">Video link<span className='stars'>*</span></label><br />
                                                <div class="col-md-12">
                                                    <input class="form-control" type="text" name="vedio_link" value={form.vedio_link} onChange={inputHandler}   placeholder=""  />
                                                </div>
                                  
                                            </div>
                                                 
                        

                                            <div class="form-group row mb-1">
                                                <label class="col-form-label col-md-12">Title</label>
                                                <div class="col-md-12">
                                                    <input class="form-control" type="text" name="title" value={form.title} onChange={inputHandler}   placeholder=""  />
                                                </div>
                                            </div>
                            
                                            
                                             <br />
                                             <br />
                                            <div className='text-center'>
                                                <button type="submit"  className='btn btn-primary' onClick={updatevedios}>Save Change</button>
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
export default Updatevedios;