import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  allticketAction,
  ticketapproveAction,
  rejectuserbankdetailsAction,
} from "../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socketIOClient from "socket.io-client";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { getchatAction } from '../Action/action';

const ENDPOINT = config.socketUrl;
const socket = socketIOClient(ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

const loginData = !Cookies.get("loginSuccessBlackeverythingAdmin")
  ? []
  : JSON.parse(Cookies.get("loginSuccessBlackeverythingAdmin"));

const Chatss = () => {
  const [allticketlist, setallticketList] = useState({});
  const [userDetails, setuserDetails] = useState({});
  const [message, setmessage] = useState([]);
  const [sendmessage, setsendmessage] = useState('');

  const { ticket_id } = useParams();
  const { user_id } = useParams();

  useEffect(() => {
    const username = loginData?.username;
    const id = loginData?.id;
    socket.on("connect", () => {});
    console.log(username, "username");
    socket.emit(
      "joinRoom",
      JSON.stringify({
        user: username,
        user_id: user_id,
        room: ticket_id,
      })
    );

    socket.on("roomUsers", ({ room, users, chatHistory }) => {
      console.log(room);
      console.log(users);
      if (chatHistory) {
        setmessage(chatHistory);
      }
    });

    socket.on("message", (message, ticket_message) => {
      console.log("usermessagemessage", message);

      setsendmessage(
        //     {
        //   message: ticket_message,
        sendmessage
      );
      setmessage(ticket_message);
    });
  }, []);

  const getChat = async () => {
    let res = await getchatAction();
    if (res) {
      setmessage(res.data);
      console.log("123", res.data);
    }
  };

 

  const userChat = async (e) => {
    e.preventDefault();
    socket.emit(
      "chatMessage",
      JSON.stringify({
        ticket_id: ticket_id,
        sender: 0,
        receiver: user_id,
        message: sendmessage,
      })
    );
  
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setsendmessage(value);
    };
  


// const inputHandler = async (e) => {
//     setsendmessage((old) => {
//       return { ...old, sendmessage: e };
//     });
//   };

 

  
  

 



  return (
    <>
      <div class="wrapper">
        <Toaster />

        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Transactions details</h3>
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
                      <h4 className="box-title">Chats</h4>
                    </div>
                    <div className="box-body">
                      <div className="messageBox">
                        {message.map((item) =>
                          item.receiver == 0 ? (
                            //    <div className="leftBox">
                            //        <div className="msg">{item.message}</div>
                            //     </div>
                            //     :

                            //     <div className="rightBox">

                            //        <div className="msg">{item.message}</div>
                            //        </div>
                            <div className="leftBox">
                              <div className="msgreceive">{item.message}</div>
                            </div>
                          ) : (
                            <div className="rightBox">
                              <div className="msgsend">{item.message}</div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="sendBox">
                      <hr />
                      <div className="form-group">
                        <form onSubmit={(e) => userChat(e)}>
                          <div className="row">
                            <div className="col-md-11">
                              <input
                                type="text"
                                placeholder="Input message here..."
                                name="sendmessage"
                                onChange={inputHandler}
                                value={sendmessage}
                                className="form-control chat-input"
                              />
                            </div>
                            <div className="col-md-1">
                              <button
                                type="submit"
                                disabled={!sendmessage}
                                className="btn btn-primary btn-sm mt-2"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
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
  );
};
export default Chatss;
