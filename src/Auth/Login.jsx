import { MdClose } from "react-icons/md";
import "./style.css";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Login({ open, setOpen, setOpens }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState(false);
  //mutation
  const [OnEventLogin] = useMutation(LOGIN_USER);
  //
  const Next = () => {
    setOpens(true);
    setOpen(false);
  };
  useEffect(() => {
    setErrormsg(false);
  }, [email, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrormsg("Email is required");
    } else if (!password) {
      setErrormsg("Password is required");
    } else {
      try {
        await OnEventLogin({
          variables: {
            login: {
              email,
              password,
            },
          },
        }).then((value) => {
          localStorage.setItem("UserToken", value.data.onLogin);
          window.location.reload();
        });
      } catch (error) {
        setErrormsg(error.message);
      }
    }
  };
  //
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="Background">
        <div className="Login_Container">
          <div className="Login_Head">
            <h1>Login</h1>
          </div>
          {errormsg && <p style={{ color: "red" }}>{errormsg}</p>}
          <div className="Inputs_Container">
            <h4>Email:</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <div className="Forgot_Pass">
              <h4>Password:</h4>
              <Link to={"/forgot-password"}>Forgot Password?</Link>
            </div>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login__Btn" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="Signup_Page">
            <Link onClick={Next}>
              New here!&nbsp;
              <span className="Create_Account">Create an account</span>
            </Link>
          </div>
          <MdClose
            className="Close__Icon"
            size={18}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
    </>
  );
}
