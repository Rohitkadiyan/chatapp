import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import receiver from "../images/ankit.jpg";
import sender from "../images/ankit.jpg";

export default function Msg({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log(currentUser);
  console.log(currentUser.photoURL);
  // console.log(text);
  console.log(message);

  return (
    // <div className="msg owner">
    <div className={`msg ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="msgReceiver">
        {/* <img src={currentUser.photoURL} alt="" /> */}
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>Just Now</span>
      </div>
      <div className="msgSender">
        {message.img && <img src={message.img} alt="" />}
        <p>{message.text}</p>
      </div>
    </div>
  );
}
