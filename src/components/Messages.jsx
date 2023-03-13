import { onSnapshot, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import Message from "./Message";
import Msg from "./Msg";
import { db } from "../firebase";

export default function Messages() {
  const { data } = useContext(ChatContext);
  // console.log(data);
  // console.log(data.ChatId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Chats", data.ChatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
      // console.log(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.ChatId]);
  console.log(messages);
  // console.log(messages[2]?.text);

  return (
    <div className="messages">
      {/* {messages.map((m) => {
        <Message message={m} key={m.id} />;
      })} */}
      {/* {messages.map((m) => {
        <Msg message={messages[6]?.text} key={m.id} />;
      })} */}
      {/* {messages.map((mp) => { */}
      <Msg
        text={messages.map((m) => {
          return " " + m.text;
        })}
        senderId={messages.map((m) => {
          return m.senderId;
        })}
      />
      ;{/* })} */}
      {/* <Msg />
      <Msg />
      <Msg />
      <Msg />
      <Msg />
      <Msg />
      <Msg />
      <Msg /> */}
    </div>
  );
}
