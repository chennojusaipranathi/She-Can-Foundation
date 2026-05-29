import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./signup.css";

function Signup() {

    const navigate = useNavigate();

    const [signup, setSignup] = useState({
        username: "",
        password: "",
        role: ""
    });

    function handleChange(e) {

        const { name, value } = e.target;

        setSignup({
            ...signup,
            [name]: value
        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        if (signup.username.trim() === "") {

            alert("Name is required");

            return false;
        }

        if (signup.password.trim() === "") {

            alert("Password is required");

            return false;
        }

        axios.post(
            "https://she-can-foundation-1-qolc.onrender.com/signup",
            signup
        )
        .then((res) => {

            console.log(res);

            toast.success(res.data.message);

            navigate("/login");

        })
        .catch((err) => {

            toast.error(err.response.data.message);

            navigate("/signup");

        });

    }

    return (
        <>

            <section className="signupPage">

                <div className="signupGlow signupGlowOne"></div>
                <div className="signupGlow signupGlowTwo"></div>

                <div className="signupWrapper">

                    <div className="signupLeft">

                        <p className="signupTag">
                            She Can Foundation
                        </p>

                        <h1 className="signupTitle">
                            Create Your <span className="gradient-text">Future Account</span>
                        </h1>

                        <p className="signupSubtitle">
                            Enter the next-generation innovation portal designed
                            for ambitious creators, builders, and leaders.
                        </p>

                        <div className="signupFeatures">

                            <div className="signupFeature glass">
                                <h3>Immersive Experience</h3>

                                <p>
                                    Futuristic application ecosystem powered
                                    with premium UI interactions.
                                </p>
                            </div>

                            <div className="signupFeature glass">
                                <h3>Smart Access</h3>

                                <p>
                                    Seamless user and admin authentication
                                    with protected cloud sessions.
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="signupContainer glass glass--glow">

                        <div className="signupHeader">

                            <p className="miniTitle">
                                Register Account
                            </p>

                            <h2>
                                Join The Portal
                            </h2>

                        </div>

                        <div className="neon-divider"></div>

                        <form
                            onSubmit={handleSubmit}
                            method="post"
                            className="signupForm"
                        >

                            <div className="inputGroup">

                                <label>
                                    Username
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        name="username"
                                        onChange={handleChange}
                                        className="username"
                                        placeholder="Choose a username"
                                        required
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
                                        onChange={handleChange}
                                        className="password"
                                        placeholder="Create a secure password"
                                        required
                                    />

                                </div>

                            </div>

                            <div className="inputGroup">

                                <label>
                                    Select Role
                                </label>

                                <div className="roleSelector">

                                    <label className="roleCard">

                                        <input
                                            type="radio"
                                            name="role"
                                            onChange={handleChange}
                                            value="admin"
                                            className="role"
                                            required
                                        />

                                        <div className="roleContent">

                                            <span className="roleCircle"></span>

                                            <div>
                                                <h3>Admin</h3>

                                                <p>
                                                    Manage applications & dashboard
                                                </p>
                                            </div>

                                        </div>

                                    </label>

                                    <label className="roleCard">

                                        <input
                                            type="radio"
                                            name="role"
                                            onChange={handleChange}
                                            value="user"
                                            className="role"
                                            required
                                        />

                                        <div className="roleContent">

                                            <span className="roleCircle"></span>

                                            <div>
                                                <h3>User</h3>

                                                <p>
                                                    Submit and manage applications
                                                </p>
                                            </div>

                                        </div>

                                    </label>

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="signupBtn"
                            >

                                <span>Create Account</span>

                                <div className="btnGlow"></div>

                            </button>

                            <div className="loginRedirect">

                                <p>
                                    Already have an account?
                                </p>

                                <Link to={`/login`}>
                                    Login
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>

            </section>

        </>
    );
}

export default Signup;