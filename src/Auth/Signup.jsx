import { MdClose } from "react-icons/md";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../graphql/mutation";
import { useEffect, useState } from "react";

export default function Signup({ opens, setOpens, setOpen }) {
  const Next = () => {
    setOpen(true);
    setOpens(false);
  };
  //usestate

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errormsg, setErrormsg] = useState(false);
  const navigate = useNavigate();
  //mutation
  const [OnSignup] = useMutation(SIGNUP_USER);
  //useeffect
  useEffect(() => {
    setErrormsg(false);
  }, [email, password, name, number]);
  //number regex
  const numberregex = /^\d{10}$/;
  //regex for email format validation
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //checking the input value only the numericals
  const handleInputChange = (event) => {
    const input = event.target.value;
    const numericInput = input.replace(/\D/g, ""); // Remove non-numeric characters
    setNumber(numericInput);
  };
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      setErrormsg("Please enter your name");
    } else if (!numberregex.test(number)) {
      setErrormsg("Enter valid Phone Number");
    } else if (email === "" || !regex.test(email)) {
      setErrormsg("Invalid email address");
    } else if (password.length < 8) {
      setErrormsg("Password  at least 8 characters long");
    } else if (!passwordregex.test(password)) {
      setErrormsg("Must contain Numbers,Special characters,Upper & Lower case");
    } else {
      try {
        const value = await OnSignup({
          variables: {
            login: {
              email,
              password,
              name,
              number,
            },
          },
        });
        console.log("signup", value);
        setOpens(false);
        navigate(`/verify/${email}`);
      } catch (error) {
        setErrormsg(error.message);
        console.log(error);
      }
    }
  };
  if (!opens) {
    return null;
  }
  return (
    <>
      <div className="Background">
        <div className="Login_Container">
          <div className="Login_Head">
            <h1>Signup</h1>
          </div>
          <div className="Inputs_Container">
            <form onSubmit={handleSubmit}>
              <h4>Full Name: *</h4>
              <input
                type="text"
                placeholder="Enter your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errormsg === "Please enter your name" && (
                <span className="Error__Message">{errormsg}</span>
              )}
              <h4>Phone Number: *</h4>
              <input
                type="text"
                placeholder="Enter your Phone Number"
                value={number}
                onChange={handleInputChange}
              />
              {errormsg === "Enter valid Phone Number" && (
                <span className="Error__Message">{errormsg}</span>
              )}
              <h4>Email: *</h4>
              <input
                type="text"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errormsg === "Invalid email address" && (
                <span className="Error__Message">{errormsg}</span>
              )}
              <h4>Password: *</h4>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errormsg === "Password  at least 8 characters long" && (
                <span className="Error__Message">{errormsg}</span>
              )}
              {errormsg ===
                "Must contain Numbers,Special characters,Upper & Lower case" && (
                <span className="Error__Message">{errormsg}</span>
              )}
              <button type="submit" className="login__Btn">
                Login
              </button>
            </form>
          </div>
          <div className="Signup_Page">
            <Link onClick={Next}>
              Existing User!
              <span className="Create_Account"> Login Here</span>
            </Link>
          </div>
          <MdClose
            className="Close__Icon"
            size={18}
            onClick={() => setOpens(false)}
          />
        </div>
      </div>
    </>
  );
}
