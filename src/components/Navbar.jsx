import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
// import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar border border-1">
      <span className="text-light">Live Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>LogOut</button>
      </div>
    </div>
  );
}
