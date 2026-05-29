import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./login.css";

function Login() {

    const navigate = useNavigate();

    const [loginType, setLoginType] = useState("user");

    const [login, setLogin] = useState({
        username: "",
        password: "",
    });

    function handleChange(e) {

        const { name, value } = e.target;

        setLogin({
            ...login,
            [name]: value
        });

    }

    function handleSubmitLogin(e) {

        e.preventDefault();

        axios.post(
            "https://she-can-foundation-1-qolc.onrender.com/login",
            login,
            {
                withCredentials: true
            }
        )
        .then((res) => {

            console.log(res);

            localStorage.setItem("isLoggedIn", "true");

            toast.success(res.data.message);

            navigate("/form");

        })
        .catch((err) => {

            toast.error(err?.response?.data?.message || "Login failed");

            navigate("/login");

        });

    }

    function handleSubmitAdmin(e) {

        e.preventDefault();

        axios.post(
            "https://she-can-foundation-1-qolc.onrender.com/login",
            login,
            {
                withCredentials: true
            }
        )
        .then((res) => {

            console.log(res);

            localStorage.setItem("isLoggedIn", "true");

            navigate("/allForms");

        })
        .catch((err) => {

            console.log(err);

            alert("Invalid Admin Credentials");

            navigate("/login");

        });

    }

    return (
        <>

            <section className="loginPage">

                <div className="loginGlow loginGlowOne"></div>
                <div className="loginGlow loginGlowTwo"></div>

                <div className="loginWrapper">

                    <div className="loginLeft">

                        <p className="loginTag">
                            She Can Foundation
                        </p>

                        <h1 className="loginTitle">
                            Future Ready <span className="gradient-text">Portal</span>
                        </h1>

                        <p className="loginSubtitle">
                            A premium futuristic application ecosystem designed
                            for innovators, creators, and future leaders.
                        </p>

                        <div className="featureGrid">

                            <div className="featureCard glass">
                                <h3>Secure Access</h3>
                                <p>
                                    Protected authentication system with
                                    encrypted session handling.
                                </p>
                            </div>

                            <div className="featureCard glass">
                                <h3>AI Inspired UI</h3>
                                <p>
                                    Cinematic glassmorphism experience with
                                    immersive futuristic design.
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="loginContainer glass glass--glow">

                        <div className="loginHeader">

                            <p className="miniTitle">
                                Access Portal
                            </p>

                            <h2>
                                Welcome Back
                            </h2>

                        </div>

                        <div className="toggleWrapper">

                            <button
                                className={
                                    loginType === "user"
                                    ? "toggleBtn activeToggle"
                                    : "toggleBtn"
                                }
                                onClick={() => {
                                    setLoginType("user");
                                }}
                            >
                                User Login
                            </button>

                            <button
                                className={
                                    loginType === "admin"
                                    ? "toggleBtn activeToggle"
                                    : "toggleBtn"
                                }
                                onClick={() => {
                                    setLoginType("admin");
                                }}
                            >
                                Admin Login
                            </button>

                        </div>

                        <div className="neon-divider"></div>

                        {
                            loginType === "user" && (

                                <form
                                    onSubmit={handleSubmitLogin}
                                    className="loginForm"
                                >

                                    <h3>User Authentication</h3>

                                    <div className="inputGroup">

                                        <label>
                                            Username
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="Enter username"
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>

                                    <div className="inputGroup">

                                        <label>
                                            Password
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Enter password"
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        className="loginBtn"
                                    >

                                        <span>Login</span>

                                        <div className="btnGlow"></div>

                                    </button>

                                </form>

                            )
                        }

                        {
                            loginType === "admin" && (

                                <form
                                    onSubmit={handleSubmitAdmin}
                                    className="loginForm"
                                >

                                    <h3>Admin Authentication</h3>

                                    <div className="inputGroup">

                                        <label>
                                            Admin Username
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="Enter admin username"
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>

                                    <div className="inputGroup">

                                        <label>
                                            Admin Password
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Enter admin password"
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        className="loginBtn"
                                    >

                                        <span>Access Dashboard</span>

                                        <div className="btnGlow"></div>

                                    </button>

                                </form>

                            )
                        }

                    </div>

                </div>

            </section>

        </>
    );
}

export default Login;