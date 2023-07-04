import React, { useEffect, useState } from 'react'
// import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import config from '../coreFIles/config'
import ReactDatatable from '@ashvin27/react-datatable'
import { deleteblogAction,getblogAction, addOrRemoveSliderAction } from '../Action/action';
import Swal from 'sweetalert2';
import moment from 'moment';

const Blog = () => {

  const [getbloglist, setBlogList] = useState({});
  const [form, setForm] = useState({});

    useEffect(() => {
        getblog();
    }, []);

    const getblog = async () => {
        let res = await getblogAction();
        if (res.success) {
            setBlogList(res.data)
        }
    }

    const columns = [
      {
          key: "Sno.",
          text: "Sno.",
          cell: (row, index) => index + 1
      },
      {
          key: "image",
          text: "Image",
          cell: (item) => {
              return (
                <img src={`${config.imageUrl + item.image}`} width="50px" height="50px"/>
              );
          }
      },
      {
        key: "slider_image",
        text: "Slider Image",
        cell: (item) => {
            return (
              <img src={`${config.imageUrl + item.slider_image}`} width="50px" height="50px"/>
            );
        }
    },
      {
        key: "addslider",
        text: "Add Slider",
        cell: (item) => {
            return (
              <>
              
              <label><input onChange={()=>addOrRemoveSlider(item.id)} checked={item.addslider} type="checkbox"  class="form-check-input" style={{fontSize:'15px'}}/></label>
              
              
             </>
            );
        }
    },
      {
        key: "title",
        text: "Title",
        cell: (item) => {
            return (
                `${item.title}`
            );
        }
      },
      {
        key: "blog_type",
        text: "Type",
        cell: (item) => {
            return (
                <>
                  {item.blog_type == 1  ? 
                    <span>Blog</span>
                : 
                <span>Upcoming Events</span>
                }
                  </>
            );
        }
      },
     
      {
        key: "date",
        text: "Date",
        cell: (item) => {
            return (
              `${moment(item.datetime).format('DD/MM/YYYY')}`
            );
        }
      },
     
      {
          key: "action",
          text: "Action",
          cell: (item) => {
              return (
                  <>
                    <a href={`${config.baseUrl}blogupdate/${item.id}`} className='btn btn-sm btn-primary'  id="editbtnid">Edit</a> &nbsp;
                  <button  type="button" className='btn btn-sm btn-default' id="editbtnid" onClick={() => deleteblog(item.id)}>Delete</button> &nbsp;
                 
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

  const addOrRemoveSlider = async (id) =>{
    let res = await addOrRemoveSliderAction({ 'id': id });
            if (res.success) {
              Swal.fire(
                'Success!',
                res.msg,
                'success'
                )
               await getblog();
            }
            else{
              Swal.fire(
                'Error!',
                res.msg,
                'error'
              )
            }
  }

  const deleteblog = async (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to Delete this Blog!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Deleted it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
            let res = await deleteblogAction({ 'id': id });
            if (res.success) {
              getblog();
                // toast.success(res.msg);
                Swal.fire(
                    'Deleted!',
                    res.msg,
                    'success'
                  )
            } else {
                Swal.fire(
                    'Failed!',
                    res.msg,
                    'error'
                )
                // toast.error(res.msg);
            }
        }
      })
}



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
      <h3 className="page-title mb-5 pb-2">Blogs</h3>
       
    </div>
  </div>
</div>
 {/* Content Header (Page header) */}

            {/* Main content */}
            <section className="content">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h4 className="box-title">Blogs</h4>
                        <a href={`${config.baseUrl}addblog`} className='btn btn-sm btn-primary add_btn'>Add</a> 
                    </div>
                    <div className="box-body">
                   
                      <ReactDatatable
                                                config={configForTable}
                                                records={getbloglist}
                                                columns={columns}
                                            />
                     
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
export default Blog;