import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../Context/ChatContext";

export default function Chatsbox() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handlSelect = (u) => {
    dispatch({ type: "ChangeUser", payload: u });
  };
  useEffect(() => {
    const getChat = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // console.log();
        let data = Object.entries(doc.data());
        const filterarray = data.filter((item) => item[1].date);
        setChats(filterarray);

        // setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChat();
  }, [currentUser.uid]);
  // console.log(chats);
  // console.log(Object.entries(chats));

  return (
    <div className="sidebox">
      <div className="searchForm">
        {chats
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => {
            return (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => {
                  handlSelect(chat[1]?.userinfo);
                }}
              >
                <img src={chat[1].userinfo?.photoURL} alt="" />
                <div className="userChatInfo">
                  <span>{chat[1].userinfo?.displayName}</span>
                  <p>{chat[1].lastMessage?.text}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
