import { useMutation } from "@apollo/client";
import { CONFIRM_OTP, NEW_PASSWORD, OTP_RESEND } from "../graphql/mutation";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Newpassword() {
  let params = useParams();
  let email = params?.id;
  const navigate = useNavigate();
  //
  const [otpResend] = useMutation(OTP_RESEND);
  const [confirmOtp] = useMutation(CONFIRM_OTP);
  const [newPassword] = useMutation(NEW_PASSWORD);
  //
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to store each digit of the OTP
  //console.log(otp.join(""));
  const value = otp.join("");
  //
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    // Check if the input is a number and update the state accordingly
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to the next input box on value entry
      if (value !== "" && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Move focus to the previous input box on backspace if the current input is empty
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  //otp-resend
  const resendOTPHandler = async (e) => {
    e.preventDefault();
    try {
      await otpResend({
        variables: {
          login: {
            email,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  //
  const Checkotp = async (e) => {
    e.preventDefault();
    try {
      const confirm = await confirmOtp({
        variables: {
          login: {
            otp: value,
            email,
          },
        },
      });
      console.log(confirm);
      Newpass();
    } catch (error) {
      console.log(error?.message);
    }
  };
  //
  const Newpass = async () => {
    try {
      const val = await newPassword({
        variables: {
          login: {
            otp: value,
            email,
            password,
          },
        },
      });
      console.log(val);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="Background" style={{ backgroundColor: "#000000" }}>
        <div className="Login_Container">
          <div className="Login_Head">
            <h1>Change Password</h1>
          </div>
          <p>
            To reset your passwword please enter the OTP send to your email and
            the new paswword
          </p>
          <div className="Inputs_Container">
            <h4>Enter OTP:</h4>
            <div className="OTPInput_Container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  className={`${Error ? "OTP__input__Error" : "OTP__input"}`}
                  autoComplete="false"
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength="1"
                />
              ))}
            </div>
            <h4>New Password:</h4>
            <input
              type="password"
              placeholder="Enter your New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login__Btn" onClick={Checkotp}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
