import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faMapMarkerAlt,
    faPlus,
    faSmile,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Services from "../../services";
import moment from "moment";
import { socket } from "../../services/socket";

const Messages = ({ data, roomMessages }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const messagesEnd = useRef(null)

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        setMessages(roomMessages);
        socket.on("messages", (msg) => {
            if (data && msg.room_id == data.dealer_id) {
                setMessages([...messages, msg]);
                scrollToBottom();
            }
        });
    }, [roomMessages])

    const sendMessage = () => {
        setMessage("");
        Services.admin
            .sendMessage({ text: message, driverId: data.driver_id || undefined, dealerId: data.dealer_id || undefined })
            .then((response) => {
                const json = response.data.data;
                setMessages([...messages, json])
                scrollToBottom();
            })
            .catch((error) => {
                const { response } = error;
            })
            .finally(() => { });
    };

    return (
        <section className="w-100 pb-5">
            <div className="pl-mdnav-cus mx-0">
                <div className="chat-header">
                    <h3 className="text-cus-primary pt-4">Messaging</h3>
                </div>
                <div className="chat-box mt-3 bg-white">
                    <div className="chat-body px-3" style={{
                        height: "20rem",
                        overflowY: "auto"
                    }}>
                        {messages.map((message) => <div className={`${message.senderType === "admin" ? "text-right" : "text-left"} mt-3`}>
                            <div className={`${message.senderType === "admin" ? "chat-design-right border-cus-primary  bg-cus-gredient" : "chat-design-left border-cus-success bg-succ-gredient"} d-inline-flex flex-wrap`}>
                                <p className="mb-0">{message.text}</p>
                                <span className={`${message.senderType === "admin" ? "text-left text-cus-primary" : "text-cus-success text-right"}d-block w-100`}>
                                    {moment(message.createdAt).format("HH:mm")}
                                </span>
                            </div>
                        </div>)}
                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { messagesEnd.current = el; }}>
                        </div>
                    </div>
                    <div className="px-3 mt-5">
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
                </div>

            </div>
        </section>
    );
};
export default Messages;
