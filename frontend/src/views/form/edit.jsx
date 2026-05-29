import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./edit.css";

/* ── Field wrapper with floating label ───────────────────── */
function FloatingField({ label, icon, error, children }) {
  return (
    <div className={`ef-field ${error ? "ef-field--error" : ""}`}>
      <div className="ef-field__icon">{icon}</div>
      <div className="ef-field__inner">
        {children}
        <label className="ef-field__label">{label}</label>
        <div className="ef-field__line" />
      </div>
      {error && (
        <p className="ef-field__error">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Icons ────────────────────────────────────────────────── */
const IconUser = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconMessage = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.08 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

/* ── Skeleton loader ──────────────────────────────────────── */
function EditSkeleton() {
  return (
    <div className="ef-root">
      <div className="ef-card">
        <div className="ef-skeleton">
          <div className="skel skel--title" />
          <div className="skel skel--sub" />
          <div className="skel skel--field" />
          <div className="skel skel--field" />
          <div className="skel skel--field" />
          <div className="skel skel--textarea" />
          <div className="skel skel--btn" />
        </div>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const [formData, setFormData] = useState(null);
  const [errors,   setErrors]   = useState({});
  const [saving,   setSaving]   = useState(false);
  const [touched,  setTouched]  = useState({});

  /* Fetch existing data */
  useEffect(() => {
    axios
      .get(`https://she-can-foundation-1-qolc.onrender.com/view/${id}`, { withCredentials: true })
      .then((res) => setFormData(res.data.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load application data.");
      });
  }, [id]);

  /* 3-D card tilt */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;
      const y = (e.clientY - top)  / height - 0.5;
      el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${( x * 6).toFixed(2)}deg`);
    };
    const onLeave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [formData]);

  /* Validation */
  function validate(data) {
    const e = {};
    if (!data.name?.trim())               e.name    = "Full name is required.";
    if (!data.email?.trim())              e.email   = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Please enter a valid email.";
    if (!data.message?.trim())            e.message = "Message cannot be empty.";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) {
      setErrors(validate(updated));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(formData));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSaving(true);
    axios
      .patch(`https://she-can-foundation-1-qolc.onrender.com/edit/${id}`, formData, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message || "Application updated!");
        navigate(`/success/${id}`);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong.");
        setSaving(false);
      });
  }

  if (!formData) return <EditSkeleton />;

  // const hasChanges = JSON.stringify(formData) !== "{}";
  const isValid = Object.keys(validate(formData)).length === 0;

  return (
    <div className="ef-root">
      <div className="ef-card" ref={cardRef}>

        {/* Glow border top */}
        <div className="ef-card__topline" />

        {/* Spotlight */}
        <div className="ef-card__spotlight" />

        {/* Header */}
        <div className="ef-header">
          <div className="ef-header__badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Editing Application
          </div>

          <h1 className="ef-header__title">
            Update Your <span className="gradient-text">Application</span>
          </h1>
          <p className="ef-header__sub">
            Make changes below and save to update your She Can Foundation submission.
          </p>

          {/* Application ID pill */}
          <div className="ef-header__id">
            <span className="ef-header__id-dot" />
            ID: {id?.slice(-10).toUpperCase()}
          </div>
        </div>

        <div className="ef-divider" />

        {/* Form */}
        <form className="ef-form" onSubmit={handleSubmit} noValidate>

          <div className="ef-row">
            <FloatingField label="Full Name" icon={<IconUser />} error={errors.name}>
              <input
                type="text"
                name="name"
                className="ef-input"
                value={formData.name || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your full name"
                autoComplete="name"
              />
            </FloatingField>

            <FloatingField label="Email Address" icon={<IconMail />} error={errors.email}>
              <input
                type="email"
                name="email"
                className="ef-input"
                value={formData.email || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </FloatingField>
          </div>

          {formData.phone !== undefined && (
            <FloatingField label="Phone Number" icon={<IconPhone />} error={errors.phone}>
              <input
                type="tel"
                name="phone"
                className="ef-input"
                value={formData.phone || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+1 (555) 000-0000"
                autoComplete="tel"
              />
            </FloatingField>
          )}

          <FloatingField label="Message / Statement" icon={<IconMessage />} error={errors.message}>
            <textarea
              name="message"
              className="ef-input ef-textarea"
              value={formData.message || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Share your story, goals, or why you're applying…"
              rows={5}
            />
          </FloatingField>

          {/* Character count */}
          <p className="ef-charcount">
            {(formData.message || "").length} characters
          </p>

          {/* Actions */}
          <div className="ef-actions">
            <button
              type="button"
              className="ef-btn ef-btn--ghost"
              onClick={() => navigate(-1)}
              disabled={saving}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Cancel
            </button>

            <button
              type="submit"
              className={`ef-btn ef-btn--primary ${saving ? "ef-btn--loading" : ""} ${!isValid ? "ef-btn--disabled" : ""}`}
              disabled={saving || !isValid}
            >
              {saving ? (
                <>
                  <span className="ef-spinner" />
                  Saving…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Edit;