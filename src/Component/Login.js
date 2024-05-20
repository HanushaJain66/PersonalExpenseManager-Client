import React from 'react';
import "./Login.css";
import './Signup.css';
import img1 from './img/img1.png';
import img2 from './img/img2.webp';
import img3 from './img/img3.png';
import { toast } from "react-toastify";
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handlelogin = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/eco/login`, {
                email: userData.email,
                password: userData.password,
            });
            console.log(res.data.email);
            if (res.data.success) {
                toast.success("Login Successful");
                localStorage.setItem("auth", res.data.email);
                navigate("/home");
            } else {
                toast.error("Login not successful");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error occurred during login");
        }
    }

    return (
        <div className="login-box">
            <div className="container-left">
                <div className="slider">
                    <div className="slider-content" id="first">
                        <img src={img1} alt="Image 1" />
                        <h1>Manage Your Expenses Smartly</h1>
                    </div>
                    <div className="slider-content">
                        <img src={img2} alt="Image 2" />
                        <h1>Analyze Income/Expense</h1>
                    </div>
                    <div className="slider-content">
                        <img src={img3} alt="Image 3" />
                        <h1>Easy to use</h1>
                    </div>
                </div>
            </div>
            <div className="container-right" id="con">
                <div className="heading">Welcome to Personal Expense Manager</div>
                <input
                    type="text"
                    placeholder="Enter your email"
                    id="userid"
                    name="email"
                    className="input"
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    id="password"
                    name="password"
                    className="input"
                    onChange={handleInputChange}
                />
                <div className="container2">
                    <div id="password" className="text">Forget password?</div>
                    <div className="text" id="click"> Click here</div>
                </div>
                <div className="container3">
                    <button className="button" id="button1" onClick={handlelogin}>Sign in</button>
                    <button className="button" id="button2">Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
