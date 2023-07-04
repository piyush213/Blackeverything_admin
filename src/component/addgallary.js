import React, { useEffect, useState } from 'react';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import JoditEditor from "jodit-react";
import toast, { Toaster } from 'react-hot-toast';
import config from '../coreFIles/config';
import { insertgallaryAction, getcategoryAction } from '../Action/action';

const Addgallary = () => {

    const [form, setForm] = useState({ images: '', previewImage: './images/noimage.png', category_id: '' });
    const [categorylist, SetCategoryList] = useState([]);
    const [validatioError, setvalidatioError] = useState({});

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            console.log(img)
            setForm((old) => {
                return { ...old, 'images': img, 'previewImage': URL.createObjectURL(img) }
            })
        }
    };
    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })
    }

    function validate() {
        let imagesError = "";
        if (form.images === '') {
            imagesError = "Image is required."
        }

        if (imagesError) {
            setvalidatioError({
                imagesError
            })
            return false
        } else {
            return true
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        let res = await getcategoryAction();
        console.log(res);
        if (res.success) {
            SetCategoryList(res.data)
        }
    }



    const insertimages = async (e) => {
        e.preventDefault()
        const isValid = validate();
        if (!isValid) {

        }

        else {

            let res = await insertgallaryAction(form);
            if (res.success) {
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}Gallary`;
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
                                    <h3 className="page-title mb-5 pb-2">Gallery images</h3>

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
                                            <h4 className="box-title">Add Gallery</h4>
                                        </div>
                                        <div className='row mt-20 mb-50'>
                                            <div className='row'>
                                                <div className='col-md-2'>

                                                </div>
                                                <div className='col-md-8'>
                                                    <div className="form-group row mb-1">


                                                        <label for="recipient-name" class="col-form-label">Image<span className='stars'>*</span></label><br />

                                                        <img className="main-logo" style={{ width: '100px', height: '80px' }} src={form.previewImage} />

                                                        <label class="upload-btn">
                                                            <br />
                                                            <input type="file" id="input-file" name="images" class="form-control" onChange={onImageChange} />
                                                            <span className="validationErr">{validatioError.imagesError}</span>
                                                        </label>
                                                        <label for="recipient-name" class="col-form-label">Category</label>

                                                        <select className="form-control" name="category_id" onChange={inputHandler}>
                                                            <option >- Select Category -</option>
                                                            {categorylist.map(item => (
                                                                <option value={item.id}>{item.category_name}</option>
                                                            ))}
                                                        </select>

                                                    </div>



                                                    <div className='text-center'>
                                                        <button type="submit" className='btn btn-primary' onClick={insertimages}>Save</button>
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

                    </div>
                </div>

                <Footer />
            </div>
        </>


    )

}
export default Addgallary;