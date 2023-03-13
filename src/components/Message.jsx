import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import sender from "../images/ankit.jpg";
import receiver from "../images/rohit.jpg";

export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log(message);
  return (
    // <div className="msg owner">
    <div className={`msg ${message.senderId === currentUser.uid && "  owner"}`}>
      <div className="msgReceiver">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURl
              : data.user.photoURl
          }
          alt=""
        />
        <span>Just Now</span>
      </div>
      <div className="msgSender">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}
