import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../images/img.png";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Registration() {
  let navgate = useNavigate();
  const [err, setErr] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getUserdata = (event) => {
    const { id, value } = event.target;

    setUser((user) => ({ ...user, [id]: value }));
  };
  const handleSubmit = () => {
    if (!user.name && !user.password && !user.email) {
      alert("Please Filed All ");
    }
    console.log(user);
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const users = userCredential.user;
        console.log(users);
        alert("Data Enter Successfully");
        navgate("/");
        return false;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setErr(true);

        // ..
      });
  };

  // const pushdata = async (e) => {
  //   e.preventDefault();

  //   const { name, email, password } = user;
  //   if (name && email && password) {
  //     const res = await fetch(
  //       "https://chatsappp-43fe7-default-rtdb.firebaseio.com/db.json",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name,
  //           email,
  //           password,
  //         }),
  //       }
  //     );
  //     if (res) {
  //       setUser({
  //         name: "",
  //         email: "",
  //         password: "",
  //       });
  //     }
  //     alert("Data Successfull Submit");
  //     navgate("/");
  //     alert("You Are going in  Live Chat");
  //   } else {
  //     alert("Please Filled the data");
  //   }
  // };

  return (
    <div>
      <form>
        <div className="box col-sm-7 col-md-6 col-lg-4 col-xl-3 col-8">
          <h1>Registration For Chat</h1>
          <div>
            <input
              type="text"
              placeholder="Enter Your Username"
              id="name"
              name="name"
              onChange={getUserdata}
              value={user.name}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            name="email"
            onChange={getUserdata}
            value={user.email}
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            id="password"
            name="password"
            onChange={getUserdata}
            value={user.password}
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="fileId"
            name="imageurl"
            required
          />
          <br />
          <div className="img">
            <label htmlFor="fileId">
              {" "}
              <img src={img} alt="" />
              Please Select Your Photo
            </label>
            <br />
          </div>
          <button onClick={handleSubmit}>Registration </button>
          <p>
            Please? <Link to="/login">Login</Link>
          </p>
          {err && <span>Something Error</span>}
        </div>
      </form>
    </div>
  );
}
