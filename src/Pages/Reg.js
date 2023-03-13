// import { async } from '@firebase/util';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../images/img.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Reg() {
  const navgate = useNavigate();
  const [err, setErr] = useState(false);
  const setData = async (event) => {
    event.preventDefault();
    let name = event.target[0].value;
    let email = event.target[1].value;
    let password = event.target[2].value;
    let imageurl = event.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, imageurl);
      uploadTask.on(
        (error) => {
          setErr(true);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(res.user);
            await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        }
      );
      alert("Data Successfully Submit");
      navgate("/");
    } catch (err) {
      setErr(true);
    }
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log(user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //   });
  };

  return (
    <div>
      <form onSubmit={setData}>
        <div className="box col-sm-7 col-md-6 col-lg-4 col-xl-3 col-8">
          <h1>Registration For Chat</h1>
          <div>
            <input
              type="text"
              placeholder="Enter Your Username"
              id="userId"
              name="name"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            required
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
          <button>Registration</button>
          {err && <span className="text-danger">Something Wrong</span>}
          <p>
            Please? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
