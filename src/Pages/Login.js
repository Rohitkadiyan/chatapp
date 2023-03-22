import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [err, setErr] = useState(false);
  const navgate = useNavigate();
  const setData = async (event) => {
    event.preventDefault();
    let email = event.target[0].value;
    let password = event.target[1].value;
    // console.log(email);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navgate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div>
      <form onSubmit={setData}>
        <div className=" box ht col-sm-7 col-md-6 col-lg-4 col-xl-3 col-8">
          <h1>Login For Chat</h1>
          <div className="mt-2">
            <input
              type="email"
              placeholder="Enter Your Username"
              id="userId"
              name="email"
              required
            />
          </div>

          <input
            type="password"
            placeholder="Enter Your Password"
            name="email"
            required
          />
          <button className="mt-3">Login</button>
          {err && <span className="text-danger">User Details Wrong</span>}
          <p>
            You Don't have an account ? <Link to="/reg">Registration</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
