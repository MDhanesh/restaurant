import { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CONFIRM_USER, OTP_RESEND } from "../graphql/mutation";

export default function OTP() {
  let { email } = useParams();
  //usestae
  const [verificationCode, setVerificationCode] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState(false);
  const [Error, setError] = useState(false);
  useEffect(() => {
    setError(false);
    setResendError(false);
  }, [verificationCode]);
  //mutation
  const [ConfirmEventSignup] = useMutation(CONFIRM_USER);
  const [otpResend] = useMutation(OTP_RESEND);
  //
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
  //onsubmit function
  const handleverify = async (e) => {
    e.preventDefault();
    if (value === "") {
      setError("Code is required");
    } else {
      try {
        const confirm = await ConfirmEventSignup({
          variables: {
            login: {
              otp: value,
              email,
            },
          },
        });
        console.log("ssss", confirm);
        window.location.replace("/");
      } catch (error) {
        console.log(error.message);
      }
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
  return (
    <>
      <div className="Background" style={{ backgroundColor: "#000000" }}>
        <div className="Login_Container">
          <div className="Login_Head">
            <h1>Email Verification</h1>
          </div>
          <h1>Verify Your Email </h1>
          <p>
            Thank you for signing up! To Complete the process ,Please enter the
            verification code send to your email below.
            <br />
            <span style={{ color: "#0B5CFF" }}>{email}</span>
          </p>
          {Error && <span className="Error__Message">{Error}</span>}
          {resendSuccess && (
            <span style={{ color: "#52C41A", margin: "0px" }}>
              Verification code resent successfully.
            </span>
          )}
          {resendError && (
            <span className=" Error__Message">
              Error resending verification code: {resendError}
            </span>
          )}
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
            <button className="login__Btn" onClick={handleverify}>
              Verify Email
            </button>
            <div className="OTP_Resend" onClick={resendOTPHandler}>
              Resend Otp
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
