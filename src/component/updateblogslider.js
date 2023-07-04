import React, { useEffect, useState } from 'react';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import { updateblogsliderAction,getblogslideridAction } from '../Action/action';
import toast, { Toaster } from 'react-hot-toast';
import config from '../coreFIles/config';
import JoditEditor from "jodit-react";


const Blogliderupdate = () => {
    const [getblogslideridlist, setBlogSliderid] = useState({});
    const [form, setForm] = useState({id:'',image:'', previewImage:'', title:'',description:''});
    useEffect(() => {
        getblogsliderid();
    }, []);

    const getblogsliderid=async () => {
        const id = window.location.href.split("/").pop();
        let res = await getblogslideridAction({'id':id});
        if (res.success) {
            setBlogSliderid(res.data)
            let data = res.data[0];
            setForm((old) => {
                return { ...old,"id":id, 'previewImage': config.imageUrl+data.image, 'title':data.title, 'description':data.description,'status':data.status}
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
      const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          console.log(img)
          setForm((old) => {
            return { ...old, 'image':img, 'previewImage':URL.createObjectURL(img) }
        })
        }
      };

      const inputHandler1 = async (e) => {
        console.log(e);
        setForm((old) => {
            return { ...old,'description': e }
        })
      }
      const updateBlogSlider = async (e) => {
        e.preventDefault()
            let res = await updateblogsliderAction(form);
            if (res.success) {
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}Blogslider`;
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
                                    <h3 className="page-title mb-5 pb-2">Edit Blog</h3>
                                   
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
                                            <h4 className="box-title">Edit Blog</h4>
                                        </div>
                                        <div className='row mt-20 mb-50'>
                                            <div className='row'>
                                                <div className='col-md-2'>

                                                </div>
                                                <div className='col-md-8'>
                                                <div class="form-group row mb-1">
                                                <label for="recipient-name" class="col-form-label">Image<span className='stars'>*</span></label><br />
                                  <a><img className="main-logo" style={{ width: '50px', height: '50px' }} src={form.previewImage}  /> </a>

                                  <label class="upload-btn">
                                    <br />
                                    <input type="file" id="input-file" name="image" class="form-control" onChange={onImageChange}  />
                                   
                                  </label>
                                            </div>
                                            <div class="form-group row mb-1">
                                                <label class="col-form-label col-md-12">Title</label>
                                                <div class="col-md-12">
                                                    <input class="form-control" type="text" name="title" value={form.title} onChange={inputHandler}   placeholder=""  />
                                                </div>
                                            </div>
                                            <div class="form-group row mb-4">
                                                <label class="col-form-label col-md-12">Description</label>
                                                <div class="col-md-12">
                                                <JoditEditor
                                                        // editorRef={this.setRef}
                                                        value={form.description}
                                                        // config={this.config}
                                                        onChange={inputHandler1}
                                                    />
                                                    </div>
                                            </div>
                                          
                                             <br />
                                             <br />
                                            <div className='text-center'>
                                                <button type="submit"  className='btn btn-primary' onClick={updateBlogSlider}>Save Change</button>
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
export default Blogliderupdate;