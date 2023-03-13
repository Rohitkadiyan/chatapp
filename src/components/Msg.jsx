import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import receiver from "../images/ankit.jpg";
import sender from "../images/ankit.jpg";

export default function Msg({ text, senderId }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log(currentUser);
  console.log(currentUser.photoURL);
  // console.log(text);
  return (
    <div className="msg owner">
      {/* // <div className={`msg ${senderId !== currentUser.uid && "  owner"}`}> */}
      <div className="msgReceiver">
        <img src={currentUser.photoURL} alt="" />
        {/* <img
          src={
            senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        /> */}
        <span>Just Now</span>
      </div>
      <div className="msgSender">
        <p>{text}</p>
        {/* <img src={sender} alt="" /> */}
        {/* {img && <img src={img} alt="" />} */}
      </div>
    </div>
  );
}
