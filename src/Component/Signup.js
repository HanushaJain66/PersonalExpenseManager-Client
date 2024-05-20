import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = ({ setUserId, signUpBtn }) => {
  const [user, setUser] = useState({
    ID: '',
    Name: '',
    Email: '',
    Phone: '',
    Pswd1: '',
    Pswd2: '',
    Proff: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [warn, setWarn] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const handleotp=(e)=>{
    // const{name,value}=e.target;
    setOtp(e.target.value);
  }

  const handleGetOtpClick = async () => {
    if (user.Email) {
      try {
        // Send request to backend to generate and send OTP to user's email
        const response = await axios.post('http://localhost:5000/eco/sendotp', {
          email: user.Email,
        });
        if (response.status === 200) {
          setOtpSent(true);
          setShowOtpDialog(true);
          toast.success('OTP sent to your email!');
        } else {
          setWarn('Failed to send OTP. Please try again.');
        }
      } catch (error) {
        console.error(error);
        setWarn('Failed to send OTP. Please try again later.');
      }
    } else {
      toast.error('Please enter your email!');
    }
  };

  const handleSignupClick = async () => {
    if (otp && user.Name && user.Email && user.Pswd1) {
      try {
        // Send request to backend to verify OTP
        const response = await axios.post('http://localhost:5000/eco/verifyotp', {
          email: user.Email,
          otp,
        });
        if (response.data.success) {
          // OTP matched, proceed with registration
          const registerResponse = await axios.post('http://localhost:5000/eco/signup', {
            user_id: user.ID,
            name: user.Name,
            email: user.Email,
            phone: user.Phone,
            password: user.Pswd1,
            confirmpassword: user.Pswd2,
            Profession: user.Proff,
          });
          if (registerResponse.status === 200) {
            toast.success('Signup successful!');
            // Navigate to the login page after successful signup
            window.location.href = '/login';
          } else {
            setWarn('Unknown error occurred.');
          }
        } else {
          toast.error('OTP verification failed. Please enter the correct OTP.');
        }
      } catch (error) {
        console.error(error);
        setWarn('Signup failed. Please try again later.');
      }
    } else {
      toast.error('Fill all the details!');
    }
  };

  return (
    <div className="sign-up-box">
      <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          <div className="user-details">
            <div className="input-box">
              <input type="text" placeholder="Enter your name" required name="ID" id="User_Id" onChange={handleInput} />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter your username" required name="Name" id="User_Name" onChange={handleInput} />
            </div>
            <div className="input-box">
              <input type="email" placeholder="Enter your email" required name="Email" id="Email" onChange={handleInput} />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter your number" required name="Phone" id="Phone_Number" onChange={handleInput} />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Enter your password" required name="Pswd1" id="Password" onChange={handleInput} />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Confirm your password" required name="Pswd2" id="Confirm_Password" onChange={handleInput} />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter your Profession" required name="Proff" id="Profession" onChange={handleInput} />
            </div>
            <div className="input-box">
              <input type="number" placeholder="Enter the otp" required name="otp" id="otp"   value={otp} onChange={handleotp} style={{ display: (showOtpDialog === true) ? 'inline' : 'none' }} />
            </div>
          </div>
          <input className="button" type="button" value={otpSent ? 'Register' : 'Get OTP'} onClick={otpSent ? handleSignupClick : handleGetOtpClick} />
          {/* <input className="button" type="submit" value="Login" /> */}
          {/* <div id='warn' style={{ color: 'red' }}>{warn}</div> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
