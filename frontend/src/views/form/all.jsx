import { useState, useEffect } from "react";
import axios from "axios";

import "./allForms.css";

function AllForms() {

    const [forms, setForms] = useState([]);

    useEffect(() => {

        axios.get(
            "https://she-can-foundation-1-qolc.onrender.com/allForms",
            {
                withCredentials: true
            }
        )
        .then((res) => {

            console.log(res.data);

            setForms(res.data.forms);

        })
        .catch((err) => {

            console.log(err);

        });

    }, []);

    return (

        <>

            <section className="allFormsPage">

                <div className="formsGlow formsGlowOne"></div>
                <div className="formsGlow formsGlowTwo"></div>

                <div className="formsHero">

                    <p className="formsTag">
                        Admin Dashboard
                    </p>

                    <h1 className="formsTitle">
                        Submitted <span className="gradient-text">Applications</span>
                    </h1>

                    <p className="formsSubtitle">
                        Explore all applications submitted to the
                        She Can Foundation portal in one futuristic dashboard.
                    </p>

                </div>

                <div className="formsStats">

                    <div className="statCard glass glass--glow">
                        <h2>{forms.length}</h2>
                        <p>Total Applications</p>
                    </div>

                    <div className="statCard glass glass--glow">
                        <h2>Live</h2>
                        <p>Submission Status</p>
                    </div>

                    <div className="statCard glass glass--glow">
                        <h2>Secure</h2>
                        <p>Cloud Synced</p>
                    </div>

                </div>

                <div className="cardContainer">

                    {
                        forms.map((form) => (

                            <div
                                className="formCard glass glass--glow"
                                key={form._id}
                            >

                                <div className="cardGlow"></div>

                                <div className="cardTop">

                                    <div className="avatarCircle">
                                        {form.name.charAt(0)}
                                    </div>

                                    <div>

                                        <h2>
                                            {form.name}
                                        </h2>

                                        <p className="emailText">
                                            {form.email}
                                        </p>

                                    </div>

                                </div>

                                <div className="neon-divider"></div>

                                <div className="messageBox">

                                    <p className="messageLabel">
                                        Application Message
                                    </p>

                                    <p className="messageContent">
                                        {form.message}
                                    </p>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </section>

        </>

    )

}

export default AllForms;