import {
  arrayUnion,
  doc,
  updateDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import attach from "../images/attach.png";
import uuid from "react-uuid";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          // setErr(true);
          // console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "Chats", data.ChatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "Chats", data.ChatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.ChatId + ".lastMessage"]: {
        text,
      },
      [data.ChatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.ChatId + ".lastMessage"]: {
        text,
      },
      [data.ChatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };
  return (
    <div>
      <div className="input">
        <input
          type="text"
          placeholder="Type message ...."
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
        <div className="send">
          <img src={attach} alt="" />
          {/* <input type="file" style={{display:'none'}} id="file" onChange={(e)=>{setImg(e.target.value)}}/> */}
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
          {/* <label htmlFor="file">
          <img src={img} alt=""  />
        </label> */}
          <label htmlFor="file">
            <img src={img} alt="" />
            img
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}
