import React, { useEffect, useState } from 'react'
// import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import config from '../coreFIles/config'
import ReactDatatable from '@ashvin27/react-datatable'
import {getBlogSliderAction,BlogActiveAction,BlogDeactiveAction } from '../Action/action';
import Swal from 'sweetalert2';
import moment from 'moment';

const Blogslider = () => {

  const [getblogsliderlist, setBlogSliderList] = useState({});
  const [form, setForm] = useState({});

    useEffect(() => {
        getblogslider();
    }, []);

    const getblogslider = async () => {
        let res = await getBlogSliderAction();
        if (res.success) {
            setBlogSliderList(res.data)
        }
    }

    const BlogActive = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Active this Slider!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Active it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await  await BlogActiveAction({ 'id': id });
                if (res.success) {
                    getblogslider();
                    // toast.success(res.msg);
                    Swal.fire(
                        'Status!',
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

    const BlogDeactive = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Deactive this Slider!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Deactive it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await  await BlogDeactiveAction({ 'id': id });
                if (res.success) {
                    getblogslider();
                    // toast.success(res.msg);
                    Swal.fire(
                        'Status!',
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
        key: "title",
        text: "Title",
        cell: (item) => {
            return (
                `${item.title}`
            );
        }
      },
    
     
      {
        key: "updated_at",
        text: "Date",
        cell: (item) => {
            return (
              `${moment(item.updated_at).format('DD/MM/YYYY')}`
            );
        }
      },
     
      {
        key: "",
        text: "Status",
        cell: (item) => {
            return (
                <>
                
  {item.status === 0 ?

<button type="button" onClick={() => BlogActive(item.id)} className='btn btn-sm btn-primary'>Deactive </button>

: item.status === 1 ?
<button type="button" onClick={()=>BlogDeactive(item.id)} className='btn btn-sm btn-primary'>Active </button>
  :
  ''
}
               
                </>
            )
        }
      },
      {
          key: "action",
          text: "Action",
          cell: (item) => {
              return (
                  <>
                    <a href={`${config.baseUrl}updateblogslider/${item.id}`} className='btn btn-sm btn-primary'  id="editbtnid">Edit</a> &nbsp;
  
                 
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
          excel: false,
          print: false

      }
  }
//   const deleteblog = async (id) => {
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You want to Delete this Blog!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, Deleted it!'
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//             let res = await  await deleteblogAction({ 'id': id });
//             if (res.success) {
//               getblog();
//                 // toast.success(res.msg);
//                 Swal.fire(
//                     'Deleted!',
//                     res.msg,
//                     'success'
//                   )
//             } else {
//                 Swal.fire(
//                     'Failed!',
//                     res.msg,
//                     'error'
//                 )
//                 // toast.error(res.msg);
//             }
//         }
//       })
// }



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
      <h3 className="page-title mb-5 pb-2">Blog Slider</h3>
       
    </div>
  </div>
</div>
 {/* Content Header (Page header) */}

            {/* Main content */}
            <section className="content">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="box">
                  
                    <div className="box-body">
                   
                      <ReactDatatable
                                                config={configForTable}
                                                records={getblogsliderlist}
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
export default Blogslider;