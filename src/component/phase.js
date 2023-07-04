import React, { useEffect, useState } from 'react'
// import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import ReactDatatable from '@ashvin27/react-datatable'
import { getPhaseListAction, updatePhaseStatusAction, updatePhaseAction } from '../Action/action';
import Swal from 'sweetalert2';
import moment from 'moment';

const Phase = () => {

  const [phaseList, setPhaseList] = useState({});
  const[loader,setLoader] =useState(true);
  const [form, setForm] = useState({});

    useEffect(() => {
      getPhaseList();
    }, []);

    const getPhaseList = async () => {
      setLoader(true)
        let res = await getPhaseListAction();
        if (res.success) {
          setLoader(false)
          setPhaseList(res.data)
        }
    }

    const columns = [
      {
          key: "Sno.",
          text: "Sno.",
          cell: (row, index) => index + 1
      },
      {
          key: "phase",
          text: "Phase",
          cell: (item) => {
              return (
                  `${item.phase}`
              );
          }
      },
      // {
      //   key: "quantity",
      //   text: "Quantity",
      //   cell: (item) => {
      //       return (
      //           `${item.quantity}`
      //       );
      //   }
      // },
      {
        key: "price",
        text: "Price",
        cell: (item) => {
            return (
                `INR ${item.price}`
            );
        }
      },
      // {
      //   key: "sold",
      //   text: "Sold",
      //   cell: (item) => {
      //       return (
      //           `${parseFloat(item.sold).toFixed(2)}`
      //       );
      //   }
      // },
      // {
      //   key: "date",
      //   text: "Date",
      //   cell: (item) => {
      //       return (
      //         `${moment(item.start_date).format('DD/MM/YYYY')} - ${moment(item.end_date).format('DD/MM/YYYY')}`
      //       );
      //   }
      // },
      {
        key: "status",
        text: "Status",
        cell: (item) => {
            return (
              <>
              {item.status == 1 ? 
                  <>
                  <b>Active</b>
                  </>
                  :
                  <></>
              }
              </>
            );
        }
      },
      {
          key: "action",
          text: "Action",
          cell: (item) => {
              return (
                  <>
                  <button onClick={() => updatePhase(item.id, item.price, item.phase)} type="button" className='btn btn-sm btn-default'  id="editbtnid">Edit</button> &nbsp;
                  {item.status == 0 ? 
                      <>
                      <button onClick={() => updatePhaseStatus(item.id, 1)}  type="button" className='btn btn-sm btn-primary'  >Activate</button>
                      </>
                      :
                      <>
                      <button onClick={() => updatePhaseStatus(item.id, 0)}  type="button" className='btn btn-sm btn-danger'  >Deactivate</button>
                      </>
                  }
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

    const updatePhaseStatus = async (id, status) => {
      let stt = '';
      let stt2 = '';
      if(status == 1) { stt = 'Active'; stt2 = 'Activated'}
      else { stt = 'deactive'; stt2 = 'Deactivated'}

      Swal.fire({
          title: 'Are you sure?',
          text: "You want to "+stt+" this phase!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, '+stt+' it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
              form.id = id;
              form.status = status;
              let res = await updatePhaseStatusAction(form);
              if (res.success) {
                getPhaseList();
                  Swal.fire(
                      stt2,
                      res.msg,
                      'success'
                    )
              } else {
                  Swal.fire(
                      'Failed!',
                      res.msg,
                      'error'
                  )
              }
          }
        })
  }

  const updatePhase = async (id, price, phase) => {

    Swal.fire({
      title: 'Update '+phase+' price',
      focusConfirm: false,
      html: `
      <lable><b>Price : </b></lable>
        <input class="swal2-input" id="newPrice" type="text" placeholder="Enter phase price" value="`+price+`" />
      `,
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'grey',
      confirmButtonText: 'Update!',
      allowOutsideClick: true,
      preConfirm: () => ({
        
      })
    }).then(async (result) => {
      if (result.isConfirmed) {
        let newPrice = document.getElementById('newPrice').value;

          form.id = id;
          form.price = newPrice;
          let res = await updatePhaseAction(form);
          if (res.success) {
            getPhaseList();
              Swal.fire(
                  'Updated',
                  res.msg,
                  'success'
                )
          } else {
              Swal.fire(
                  'Failed!',
                  res.msg,
                  'error'
              )
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
      <h3 className="page-title mb-5 pb-2">Phase</h3>
        <p className='mb-1'>* To activate new phase first you have to Deactivate previous phase</p>
        <p className='mb-1'>* Only one phase can be activated at a time</p>
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
                      <h4 className="box-title">Phase</h4>
                    </div>
                    <div className="box-body">
                   {!loader ?
                      <ReactDatatable
                                                config={configForTable}
                                                records={phaseList}
                                                columns={columns}
                                            />
                                            :
                                            <>
                                             <br/>
                                            <br/>
                                        <center><h4><i className='fa fa-spinner fa-spin'></i> &nbsp; Please wait</h4></center>
                                        <br/>
                                        <br/>
                                            </>
                                          }
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
export default Phase;