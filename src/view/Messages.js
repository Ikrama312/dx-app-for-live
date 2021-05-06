import React, { useState, useEffect, useRef } from "react";
import user_avatar from "../assets/img/user_img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faMapMarkerAlt,
  faPlus,
  faSmile,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Services from "../services";
import moment from "moment"
import { socket } from "../services/socket";

const Messages = () => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEnd = useRef(null)

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    getRooms();
    socket.on("messages", (msg) => {
      if (currentRoom && msg.room_id == currentRoom.id) {
        setMessages([...messages, msg]);
        scrollToBottom();
      }
    });
  }, []);

  const getRooms = () => {
    Services.admin
      .getRooms()
      .then((response) => {
        const json = response.data.data;
        setRooms(json);
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => { });
  };

  const getMessages = (room) => {
    setCurrentRoom(null);
    setMessages([]);
    Services.admin
      .getRoomMessages(room)
      .then((response) => {
        const json = response.data.data.reverse();
        setMessages(json);
        scrollToBottom();
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => { });
  };

  const sendMessage = () => {
    setMessage("");
    const current = { ...currentRoom }
    Services.admin
      .sendMessage({ text: message, driverId: current.driver_id || undefined, dealerId: current.dealer_id || undefined })
      .then((response) => {
        const json = response.data.data;
        if (current.id == currentRoom.id) {
          scrollToBottom();
          setMessages([...messages, json])
        }
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => { });
  };

  return (
    <section className=" pb-5">
      <div className="row pl-mdnav-cus mx-0">
        <div className="chat-header col-12">
          <h3 className="text-cus-primary pt-4">Messages</h3>
        </div>
        <div className="col-md-5">
          <div className="message-box">
            <div className="custom-card mt-3 bg-white">
              <div className="card-cus-header text-center bg-cus-primary text-white">
                <p className="mb-0">Messages</p>
              </div>
              <div style={{
                height: "30.5rem",
                overflowY: "auto",
                overflowX: "hidden"
              }}>
                {rooms.map((room) => (
                  <div
                    className="users-messages border-bottom px-2 pt-2 pb-3 position-relative"
                    onClick={() => {
                      if (!currentRoom || currentRoom.id != room.id) {
                        getMessages(room);
                        setCurrentRoom(room);
                      }
                    }}
                  >
                    <div className="d-flex flex-wrap  chat-user-box">
                      <div className="messager-avatar ">
                        <img
                          className="rounded-circle"
                          src={room.driver ? room.driver.image || user_avatar : room.dealer.image || user_avatar}
                          width="70px"
                          height="70px"
                        />
                      </div>
                      <div className="messager-detail pl-3">
                        <h6 className="mb-0 text-cus-primary">{room.driver ? room.driver.fullName : room.dealer.fullName}</h6>
                        <span className="mb-0 text-cus-primary messager-state">
                          {room.driver ? room.driver.address || "_" : room.dealer.address || "_"}
                        </span>
                        <p className="messager-last mb-0">
                          {room.messages.length ? room.messages[0].text : ""}
                        </p>
                      </div>
                    </div>
                    <p className="message-time ml-auto d-contents w-100 mb-0 text-right">
                      {room.messages.length ? moment(room.messages[0].createdAt).format("DD-MM-YYYY") : ""}
                    </p>
                    <div className="user-mess-action">
                      <button
                        type="button"
                        className="bg-transparent border-0 px-0"
                      >
                        <span className="bg-cus-danger rounded-circle action-btn mr-1">
                          <FontAwesomeIcon
                            className="fa fa-trash text-white"
                            icon={faTrash}
                          />
                        </span>
                      </button>
                      <button
                        type="button"
                        className="bg-transparent border-0 px-0"
                      >
                        <span className="border-cus-success rounded-circle action-btn">
                          <FontAwesomeIcon
                            className="text-cus-success"
                            icon={faCheck}
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          {currentRoom ? <div className="chat-box mt-3 bg-white">
            <div className="card-cus-header py-3  bg-cus-primary text-white">
              <div className="d-flex flex-wrap align-items-center">
                <div className="messager-avatar ">
                  <img
                    className="rounded-circle"
                    src={user_avatar}
                    width="70px"
                    height="70px"
                  />
                </div>
                <div className=" pl-3">
                  <h6 className="mb-0 text-white font-md-cus font-700">
                    {currentRoom.driver ? currentRoom.driver.fullName : currentRoom.dealer.fullName}
                  </h6>
                  <span
                    className="mb-0 text-white"
                    style={{ fontSize: 11 + "px" }}
                  >
                    <FontAwesomeIcon
                      className="text-cus-success mr-1"
                      icon={faMapMarkerAlt}
                    />
                    {currentRoom.driver ? currentRoom.driver.address || "_" : currentRoom.dealer.address || "_"}
                  </span>
                </div>
              </div>
            </div>
            <div className="chat-body px-3" style={{
              height: "20rem",
              overflowY: "auto"
            }}>
              {messages.map((message) => <div className={`${message.senderType === "admin" ? "text-right" : "text-left"} mt-3`}>
                <div className={`${message.senderType === "admin" ? "chat-design-right border-cus-primary  bg-cus-gredient" : "chat-design-left border-cus-success bg-succ-gredient"} d-inline-flex flex-wrap`}>
                  <p className="mb-0">{message.text}</p>
                  <span className={`${message.senderType === "admin" ? "text-left text-cus-primary text-right" : "text-cus-success text-left"}d-block w-100`}>
                    {moment(message.createdAt).format("HH:mm")}
                  </span>
                </div>
              </div>)}
              <div style={{ float: "left", clear: "both" }}
                ref={(el) => { messagesEnd.current = el; }}>
              </div>
            </div>
            <div className="px-3 mt-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (message.trim()) sendMessage();
                }}
              >
                <div className="message-type-field p-3 position-relative">
                  <input
                    type="text"
                    className="w-100"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    placeholder="Type Message"
                  />
                  <div className="file-upload-btn position-absolute">
                    <label className="mb-0">
                      <input type="file" name="" className="d-none" />
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-cus-primary"
                      />
                    </label>
                  </div>
                  <div className="smile-icons position-absolute text-cus-primary">
                    <FontAwesomeIcon icon={faSmile} />
                  </div>
                </div>
              </form>
            </div>
          </div> : null}
        </div>
      </div>
    </section >
  );
};
export default Messages;
