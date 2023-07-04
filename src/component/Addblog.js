import React, { useEffect, useState } from 'react';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import JoditEditor from "jodit-react";
import toast, { Toaster } from 'react-hot-toast';
import config from '../coreFIles/config';
import { insertblogAction } from '../Action/action';

const Addblog = () => {

    const [form, setForm] = useState({image:'', previewImage:'./images/noimage.png',slider_image:'', previewsliderImage:'./images/noimage.png', title:'',description:'',blog_type:'',introduction:''});
    const [validatioError, setvalidatioError] = useState({});

    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })
      }

      const inputHandler1 = async (e) => {
        console.log(e);
        setForm((old) => {
            return { ...old, 'description': e }
        })
      }
      const inputHandler2 = async (e) => {
        console.log(e);
        setForm((old) => {
            return { ...old, 'introduction': e }
        })
      }


      const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          console.log(img)
          setForm((old) => {
            return { ...old, 'image': img, 'previewImage':URL.createObjectURL(img) }
        })
        }
      };
      
      const onsliderImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          console.log(img)
          setForm((old) => {
            return { ...old, 'slider_image': img, 'previewsliderImage':URL.createObjectURL(img) }
        })
        }
      };
      function validate() {
        let imageError = "";
        let titleError = "";
        let descriptionError = "";
        let introductionError = "";
       
    
        if (form.image === '') {
          imageError = "Image is required."
        }
        if (form.title === '') {
            titleError = "Title is required."
        }
        if (form.description === '') {
            descriptionError = "Description is required."
        }
        if (form.introduction === '') {
            introductionError = "Introduction is required."
        }
       
        if (imageError || titleError||descriptionError||introductionError) {
            setvalidatioError({
              imageError, titleError,descriptionError,introductionError
            })
            return false
        } else {
            return true
        }
    }
      const insertBlog = async (e) => {
        e.preventDefault()
        const isValid = validate();
        if (!isValid) {
    
        }
        else {
            let res = await insertblogAction(form);
            if (res.success) {
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}blog`;
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
                                    <h3 className="page-title mb-5 pb-2">Add Blog</h3>
                                   
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
                                            <h4 className="box-title">Add Blog</h4>
                                        </div>
                                        <div className='row mt-20 mb-50'>
                                            <div className='row'>
                                                <div className='col-md-2'>

                                                </div>
                                                <div className='col-md-8'>
                                                <div className="form-group row mb-1">
                                               
                                    
                                  <label for="recipient-name" class="col-form-label">Image<span className='stars'>*</span></label><br />
                                  
                                    <img className="main-logo" style={{ width: '100px', height: '80px' }} src={form.previewImage}  /> 

                                  <label class="upload-btn">
                                    <br />
                                    <input type="file" id="input-file" name="avatar" class="form-control" onChange={onImageChange}  />
                                    <span className="validationErr">{validatioError.imageError}</span>
                                  </label>

                                
                                               
                                            </div>
                                           
                                            <div className="form-group row mb-1">
                                                <label className="col-form-label col-md-12">Title</label>
                                                <div className="col-md-12">
                                                    <input className="form-control" type="text" name="title" value={form.title} onChange={inputHandler}  placeholder="Title"  />
                                                </div>
                                                <span className="validationErr">{validatioError.titleError}</span>
                                            </div>
                                            <div className="form-group row mb-4">
                                                <label className="col-form-label col-md-12">Description</label>
                                                <div className="col-md-12">
                                                <JoditEditor
                                                        // editorRef={this.setRef}
                                                        // config={this.config}
                                                     onChange={inputHandler1}
                                                    />
                                                     <span className="validationErr">{validatioError.descriptionError}</span>
                                                    </div>
                                                   
                                            </div>
                                            <div className="form-group row mb-4">
                                                <label className="col-form-label col-md-12">Introduction</label>
                                                <div className="col-md-12">
                                                <JoditEditor
                                                        // editorRef={this.setRef}
                                                        // config={this.config}
                                                     onChange={inputHandler2}
                                                    />
                                                     <span className="validationErr">{validatioError.introductionError}</span>
                                                    </div>
                                                   
                                            </div>
                                            <div className="form-group row mb-1">
                                            <label className="col-form-label col-md-12">Select:</label>
                                            <select className='form-control' name="blog_type" value={form.blog_type} onChange={inputHandler}>
                                            <option value>Select</option> 
                                            <option value="1">Blog</option>
                                            <option value="2">Upcoming Events</option>
                                             </select>
                                             
                                             </div>
                                             <br />
                                             <br />
                                             <div className="form-group row mb-1">
                                               
                                    
                                  <label for="recipient-name" class="col-form-label">SliderImage<span className='stars'>*</span></label><br />
                                  
                                    <img className="main-logo" style={{ width: '100px', height: '80px' }} src={form.previewsliderImage}  /> 

                                  <label class="upload-btn">
                                    <br />
                                    <input type="file" id="input-file" name="slider_image" class="form-control" onChange={onsliderImageChange}  />
                                    {/* <span className="validationErr">{validatioError.imageError}</span> */}
                                  </label>

                                
                                               
                                            </div>
                                            <div className='text-center'>
                                                <button type="submit"  className='btn btn-primary' onClick={insertBlog}>Save</button>
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
export default Addblog;