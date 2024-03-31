import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { PASSWORD_OTP } from "../graphql/mutation";
import { useNavigate } from "react-router-dom";

export default function Forgot({ open, setOpen }) {
  useEffect(() => {
    setOpen(false);
  }, [open]);

  const [email, setEmail] = useState("");
  const [errormsg, setErrormsg] = useState(false);
  useEffect(() => {
    setErrormsg(false);
  }, [email]);
  //
  const navigate = useNavigate("");
  //
  const [passwordOtp] = useMutation(PASSWORD_OTP);
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrormsg("Email is required");
    } else {
      try {
        await passwordOtp({
          variables: {
            login: {
              email,
            },
          },
        });
        navigate(`/new-password/${email}`);
      } catch (error) {
        setErrormsg(error.message);
      }
    }
  };
  return (
    <>
      <div className="Background" style={{ backgroundColor: "#000000" }}>
        <div className="Login_Container">
          <div className="Login_Head">
            <h1>Email Verification</h1>
          </div>
          <h1>Reset your password </h1>
          <p>
            To reset your passwword please enter the email address associated
            with your account.
          </p>
          {errormsg && <p style={{ color: "red" }}>{errormsg}</p>}
          <div className="Inputs_Container">
            <h4>Email:</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button className="login__Btn" onClick={handleSubmit}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
