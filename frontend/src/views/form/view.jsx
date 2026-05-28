import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./view.css";

function View() {

    const { id } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {

        axios.get(`http://localhost:8080/view/${id}`,
            {
                withCredentials: true
            }
        )
        .then((res) => {

            setData(res.data.data);

        })
        .catch((err) => {

            console.log(err);

        });

    }, [id]);

    if (!data) {

        return (
            <section className="loadingPage">

                <div className="loadingOrb"></div>

                <div className="loadingCard glass glass--glow">

                    <div className="loaderRing"></div>

                    <h1>Loading Application...</h1>

                    <p>Please wait while we retrieve your submission.</p>

                </div>

            </section>
        );
    }

    return (
        <>
            <section className="viewPage">

                <div className="viewGlow viewGlowOne"></div>
                <div className="viewGlow viewGlowTwo"></div>

                <div className="viewContainer glass glass--glow">

                    <div className="viewHeader">

                        <div>
                            <p className="viewTag">
                                She Can Foundation
                            </p>

                            <h1>
                                Your <span className="gradient-text">Application</span>
                            </h1>
                        </div>

                        <div className="viewStatus">
                            <span></span>
                            Securely Stored
                        </div>

                    </div>

                    <div className="neon-divider"></div>

                    <div className="viewContent">

                        <div className="infoCard">
                            <p className="infoLabel">Full Name</p>

                            <h2>{data.name}</h2>
                        </div>

                        <div className="infoCard">
                            <p className="infoLabel">Email Address</p>

                            <h2>{data.email}</h2>
                        </div>

                        <div className="infoCard messageCard">
                            <p className="infoLabel">Your Message</p>

                            <p className="messageText">
                                {data.message}
                            </p>
                        </div>

                    </div>

                    <div className="actionSection">

                        <Link to={`/edit/${id}`} className="editLink">

                            <button className="editApplicationBtn">

                                <span>Edit Application</span>

                                <div className="btnGlow"></div>

                            </button>

                        </Link>

                    </div>

                </div>

            </section>
        </>
    );
}

export default View;