import React, { Component } from "react";
import axios from "axios";
import config from "../coreFIles/config";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import socketIOClient from "socket.io-client";
import Header from "../directives/header";
import Sidebar from "../directives/sidebar";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const ENDPOINT = config.socketUrl;
const socket = socketIOClient(ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

// const loginData = (!Cookies.get('loginSuccessBlackeverythingAdmin')) ? [] : JSON.parse(Cookies.get('loginSuccessBlackeverythingAdmin'));

export default class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      sendmessage: "",
    };

    this.loginData = !Cookies.get("loginSuccessBlackeverythingAdmin")
      ? ""
      : JSON.parse(Cookies.get("loginSuccessBlackeverythingAdmin"));
    // this.loginData = !Cookies.get("loginSuccessBlackeverythingAdmin")
    //   ? []
    //   : JSON.parse(Cookies.get("loginSuccessBlackeverythingAdmin"));
    const {
      match: { params },
    } = this.props;
    this.ticket_id = params.id;

    this.user_id = params.user_id;

    this.userChat = this.userChat.bind(this);
  }

  componentDidMount() {
    console.log(this.loginData);
    console.log("hello");
    const username = this.loginData?.username;
    const user_id = this.loginData?.id;
    socket.on("connect", () => {});
    console.log(username, "username");

    socket.emit(
      "joinRoom",
      JSON.stringify({
        user: username,
        user_id: user_id,
        room: this.ticket_id,
      })
    );
    console.log("joinRoomm", {
      username: username,
      user_id: user_id,
      room: this.ticket_id,
    });

    socket.on("roomUsers", ({ room, users, chatHistory }) => {
      console.log(room);
      console.log(users);
      if (chatHistory) {
        this.setState({
          message: chatHistory,
        });
      }
    });

    socket.on("message", (message, ticket_message) => {
      console.log("usermessagemessage", message);

      this.setState({
        message: ticket_message,
        sendmessage: "",
      });
    });

    console.log("connect");

    // this.getChat()
  }

  async userChat(e) {
    e.preventDefault();

    // var data ={
    //     ticket_id : this.ticket_id,
    //     sender : 0 ,
    //     receiver : this.user_id,
    //     message : this.state.sendmessage
    // }

    // const admin_user_id=this.loginData?.data?.id

    socket.emit(
      "chatMessage",
      JSON.stringify({
        ticket_id: this.ticket_id,
        sender: 0,
        receiver: this.user_id,
        message: this.state.sendmessage,
      })
    );
    // let headers = {
    //     'Authorization': this.loginData?.Token,
    //     'Content-Type': 'application/json'
    // }
    // await axios.post(`${config.apiUrl}/insertchat`,data, { headers:headers })
    //     .then(result => {

    //         if (result.data.success === true) {
    //             window.location.reload()
    //             this.getChat()
    //             this.setState({
    //                 message1: ''
    //             })

    //         }

    //          if (result.data.success === false) {

    //         }
    //     })

    //     .catch(err => {
    //     })
  }

  async getChat() {
    let headers = {
      Authorization: this.loginData?.authToken,
      "Content-Type": "application/json",
    };

    var data = {
      ticket_id: this.ticket_id,
      email: this.loginData?.username,
    };
    await axios
      .post(`${config.apiUrl}/getchat`, data, { headers: headers })
      .then((result) => {
        console.log(result.data);
        if (result.data.success === true) {
          this.setState({
            message: result.data.data,
          });
        }

        if (result.data.success === false) {
        }
      })

      .catch((err) => {});
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  loading() {
    // setTimeout(() => {
    //     window.location.reload()
    // }, );
  }

  render() {
    return (
      <>
        <div class="wrapper">
          <Header />
          <ToastContainer />
          <div className="content-wrapper">
            <Sidebar />
            <div className="container-full">
              <div className="pcoded-content">
                {/* <!-- Page-header start --> */}
                {/* <div className="page-header">
                                        <div className="page-block">
                                            <div className="row align-items-center">
                                                <div className="col-md-8">
                                                    <div className="page-header-title">
                                                        <h5 className="m-b-10">Chats</h5>
                                                        <p className="m-b-0">Welcome to Chats</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <ul className="breadcrumb">
                                                        <li className="breadcrumb-item">
                                                            <a href="#/"> <i className="fa fa-home"></i> </a>
                                                        </li>
                                                        <li className="breadcrumb-item"><a href={`${config.baseUrl}dashboard`}>Dashboard</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                <div className="pcoded-inner-content">
                  <div className="main-body">
                    <div className="page-wrapper">
                      <div className="page-body">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="card">
                              <div className="card-header">
                                <h5>Chats</h5>
                                {console.log(this.loginData, "logindata")}
                              </div>
                              <div className="card-block">
                                <div className="messageBox">
                                  {this.state.message.map((item) =>
                                    item.receiver == 0 ? (
                                      //    <div className="leftBox">
                                      //        <div className="msg">{item.message}</div>
                                      //     </div>
                                      //     :

                                      //     <div className="rightBox">

                                      //        <div className="msg">{item.message}</div>
                                      //        </div>
                                      <div className="leftBox">
                                        <div className="msgreceive">
                                          {item.message}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="rightBox">
                                        <div className="msgsend">
                                          {item.message}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>

                                <div className="sendBox">
                                  <hr />
                                  <div className="form-group">
                                    <form onSubmit={(e) => this.userChat(e)}>
                                      <div className="row">
                                        <div className="col-md-11">
                                          <input
                                            type="text"
                                            placeholder="Input message here..."
                                            name="sendmessage"
                                            onChange={this.onChange}
                                            value={this.state.sendmessage}
                                            className="form-control chat-input"
                                          />
                                        </div>
                                        <div className="col-md-1">
                                          <button
                                            type="submit"
                                            disabled={!this.state.sendmessage}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
