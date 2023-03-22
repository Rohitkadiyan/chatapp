import React, { useContext } from "react";
import vid from "../images/video.png";
import aud from "../images/audio.png";
import three from "../images/Three.jpg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../Context/ChatContext";

export default function Chatbox() {
  const { data } = useContext(ChatContext);
  return (
    <>
      <div className="  chatbox col-md-8 col-6  ">
        <div className="chatinfo header border p-0 pt-1 ps-1">
          <div className="Contact">
            <img src={data.user?.photoURL} alt="" />
            <span>{data.user?.displayName}</span>
          </div>
          <div className="chaticon pt-1 pe-1">
            <img src={vid} alt="" />
            <img src={aud} alt="" />
            <img src={three} alt="" />
          </div>
        </div>

        <div className="messageArea">
          <Messages />
        </div>
        <Input />
      </div>
    </>
  );
}
