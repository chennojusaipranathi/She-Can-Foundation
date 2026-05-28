import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";

function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.name.trim() === "") {
      alert("Name is required");
      return false;
    }

    if (formData.email.trim() === "") {
      alert("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Invalid email");
      return false;
    }

    if (formData.message.trim() === "") {
      alert("Message is required");
      return false;
    }

    axios
      .post("http://localhost:8080/formSubmit", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("successfully submitted");
        const id = res.data.data._id;

        toast.success(res.data.message);

        navigate(`/success/${id}`);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <>
      <section className="formPage">
        <div className="formGlow formGlowOne"></div>
        <div className="formGlow formGlowTwo"></div>

        <div className="formHero">
          <p className="formTag">Future Begins Here</p>

          <h1 className="formTitle">
            Join the <span className="gradient-text">She Can Foundation</span>
          </h1>

          <p className="formSubtitle">
            Empowering future innovators, creators, and leaders through
            technology, mentorship, and opportunity.
          </p>
        </div>

        <div className="formContainer glass glass--glow">
          <div className="formTop">
            <div>
              <p className="formMiniTitle">Application Portal</p>

              <h2>Apply Now</h2>
            </div>

            <div className="statusPill">
              <span></span>
              Applications Open
            </div>
          </div>

          <div className="neon-divider"></div>

          <form onSubmit={handleSubmit} method="post" className="futureForm">
            <div className="inputGroup">
              <label htmlFor="name">Full Name</label>

              <div className="inputWrapper">
                <input
                  type="text"
                  name="name"
                  className="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="inputGroup">
              <label htmlFor="email">Email Address</label>

              <div className="inputWrapper">
                <input
                  type="text"
                  name="email"
                  className="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="inputGroup">
              <label htmlFor="message">Why do you want to join?</label>

              <div className="inputWrapper textareaWrapper">
                <textarea
                  name="message"
                  className="message"
                  placeholder="Share your passion, ideas, goals..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="submitBtn">
              <span>Submit Application</span>

              <div className="btnGlow"></div>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Form;