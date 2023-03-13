import React, { useContext, useState } from 'react';
import { collection, query, where,getDocs,getDoc,doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
export default function Search() {
  const [username,setUsername]=useState("");
  const [user,setUser]=useState(null);
  const [err,setErr]=useState(false);
  const {currentUser}=useContext(AuthContext);
  const handleSearch= async ()=>{
    const q=query(collection(db,"users"),where("displayName","==",username));
    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
      });
    }
    catch (err){
        setErr(true);
    }
  }
  const handleKey=(e)=>{
    e.code==="Enter" && handleSearch();
  }
  const handleSelect=async ()=>{
    // check the chats in firestore exists ,if not create
     const combinId=currentUser.uid>user.uid ? currentUser.uid+user.uid: user.uid+currentUser.uid;
      try{
        const res =await getDoc(doc(db,"Chats",combinId));
        if(!res.exists()){
          // create Chat collection 
          await setDoc(doc(db,"Chats",combinId),{messages:[]});

          // create userchat
            await updateDoc(doc(db,"userChats",currentUser.uid),{
              [combinId+".userinfo"]:{
                uid:user.uid,
                displayName:user.displayName,
                photoURL:user.photoURL
              },
              [combinId+".date"]:serverTimestamp()
            });
            await updateDoc(doc(db,"userChats",user.uid),{
              [combinId+".userinfo"]:{
                uid:currentUser.uid,
                displayName:currentUser.displayName,
                photoURL:currentUser.photoURL
              },
              [combinId+".date"]:serverTimestamp()
            });
        }
      }catch(err){}
    // create user chats
    setUser(null);
    setUsername("");
  };
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='Find User' onKeyDown={handleKey} value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        {err && <span>User Not Found</span>}
      {  user &&
        <div className='userChat' onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <span>{user.displayName}</span>
        </div>
      }
      </div>
    </div>
  )
}
