import { useState } from "react";
import emailjs from "@emailjs/browser";

function EmailInput() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      // 1️⃣ Save to Google Sheets via Apps Script
      try {
        await fetch("https://script.google.com/macros/s/AKfycbxjpNusVl1T1uEUheuQWp2QOZ40klIQCHXt2Royh5qxDzwfwkIBxGX-OtGDlBqL7ZJx/exec", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email }).toString(),
        });
      } catch (err) {
        console.error("Error sending to Google Sheets:", err);
      }

      // 2️⃣ Send email via EmailJS
      try {
        await emailjs.send(
          "service_secbokp",   // EmailJS Service ID
          "template_p8mlilu",  // EmailJS Template ID
          { email },           // matches {{email}} in template
          "b6Mx95U8Eag9iU2Pk"  // EmailJS Public Key
        );
      } catch (err) {
        console.error("Error sending EmailJS:", err);
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Unexpected error during subscription:", err);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="newsletter" id="newsletter" onSubmit={handleSubmit}>
      <h3>CS Careers Newsletter</h3>
      <p>Stay updated on events and opportunities.</p>
      <div className="newsletter__row">
        <label className="sr-only" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@vt.edu"
          required
        />
        <button type="submit" className="btn btn--primary" disabled={status === "loading"}>
          {status === "success" ? "✓ Subscribed" : status === "loading" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      <small className="newsletter__fine">
        {message || "No spam. Unsubscribe anytime."}
      </small>
    </form>
  );
}

export default EmailInput;
