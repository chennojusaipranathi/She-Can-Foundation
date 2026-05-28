import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./success.css";

function Success() {

    const { id } = useParams();

    return (
        <section className="successPage">

            <div className="successGlow successGlowOne"></div>
            <div className="successGlow successGlowTwo"></div>

            <div className="successCard glass glass--glow">

                <div className="successIconWrapper">
                    <div className="successIcon">
                        ✓
                    </div>
                </div>

                <p className="successTag">
                    Application Received
                </p>

                <h1 className="successTitle">
                    Successfully <span className="gradient-text">Submitted</span>
                </h1>

                <p className="successSubtitle">
                    Your application has been securely submitted to the
                    She Can Foundation portal.
                    You can now view or edit your submission.
                </p>

                <div className="neon-divider"></div>

                <div className="successActions">

                    <Link to={`/view/${id}`} className="actionLink">
                        <button className="viewBtn">
                            <span>View Application</span>
                            <div className="btnShine"></div>
                        </button>
                    </Link>

                    <Link to={`/edit/${id}`} className="actionLink">
                        <button className="editBtn">
                            <span>Edit Application</span>
                            <div className="btnShine"></div>
                        </button>
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default Success;