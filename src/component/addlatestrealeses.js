import React, { useEffect, useState } from 'react';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import JoditEditor from "jodit-react";
import toast, { Toaster } from 'react-hot-toast';
import config from '../coreFIles/config';
import { insertlatestrealesesAction } from '../Action/action';

const Addlatestrealeses = () => {

    const [form, setForm] = useState({images:'', previewImage:'./images/noimage.png',title:'',description:'',author:''});
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
     


      const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          console.log(img)
          setForm((old) => {
            return { ...old, 'images': img, 'previewImage':URL.createObjectURL(img) }
        })
        }
      };
      
      
      function validate() {
        let imagesError = "";
        let titleError = "";
        let descriptionError = "";
        let authorError = "";
       
    
        if (form.images === '') {
          imagesError = "Image is required."
        }
        if (form.title === '') {
            titleError = "Title is required."
        }
        if (form.description === '') {
            descriptionError = "Description is required."
        }
        if (form.author === '') {
            authorError = "Introduction is required."
        }
       
        if (imagesError || titleError||descriptionError||authorError) {
            setvalidatioError({
              imagesError, titleError,descriptionError,authorError
            })
            return false
        } else {
            return true
        }
    }
      const insertlatestrealeses = async (e) => {
        e.preventDefault()
        const isValid = validate();
        if (!isValid) {
    
        }
        else {
            let res = await insertlatestrealesesAction(form);
            if (res.success) {
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}Latestreleases`;
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
                                    <h3 className="page-title mb-5 pb-2">Add Latest Releases</h3>
                                   
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
                                            <h4 className="box-title">Add Latest Releases</h4>
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
                                    <input type="file" id="input-file" name="images" class="form-control" onChange={onImageChange}  />
                                    <span className="validationErr">{validatioError.imagesError}</span>
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
                                            <div className="form-group row mb-1">
                                                <label className="col-form-label col-md-12">Author</label>
                                                <div className="col-md-12">
                                                    <input className="form-control" type="text" name="author" value={form.author} onChange={inputHandler}  placeholder="Author"  />
                                                </div>
                                                <span className="validationErr">{validatioError.authorError}</span>
                                            </div>
                                          
                                            
                               
                                            <div className='text-center'>
                                                <button type="submit"  className='btn btn-primary' onClick={insertlatestrealeses}>Save</button>
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
export default Addlatestrealeses;