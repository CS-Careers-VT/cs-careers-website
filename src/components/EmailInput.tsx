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
      console.log("Submitting email:", email);

      // 1️⃣ Save to Google Sheets via Apps Script
      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbxjpNusVl1T1uEUheuQWp2QOZ40klIQCHXt2Royh5qxDzwfwkIBxGX-OtGDlBqL7ZJx/exec", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email }).toString(),
        });

        console.log("Google Sheets response status:", res.status);
        const data = await res.json();
        console.log("Google Sheets response data:", data);
      } catch (err) {
        console.error("Error sending to Google Sheets:", err);
      }

      // 2️⃣ Send email via EmailJS
      try {
        const emailRes = await emailjs.send(
          "service_secbokp",   // EmailJS Service ID
          "template_p8mlilu",  // EmailJS Template ID
          { email },           // matches {{email}} in template
          "b6Mx95U8Eag9iU2Pk"    // EmailJS Public Key
        );
        console.log("EmailJS response:", emailRes);
      } catch (err) {
        console.error("Error sending EmailJS:", err);
      }

      setStatus("success");
      setEmail("");
      console.log("Subscription flow completed.");
    } catch (err) {
      console.error("Unexpected error during subscription:", err);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto text-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="border-csc-maroon-bg border-2 tracking-wide py-4 px-8 text-2xl rounded-full w-full text-center text-white placeholder-white bg-transparent
                   focus:border-csc-maroon-bg focus:outline-none focus:ring-2 focus:ring-csc-maroon-bg focus:ring-opacity-50 focus:bg-csc-maroon-bg focus:bg-opacity-10 
                   transition-all duration-300 ease-in-out"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`mt-4 px-6 py-2 rounded-full text-white text-xl font-semibold transition-all
          ${status === "success" ? "bg-green-600" : "bg-csc-maroon-bg hover:bg-csc-maroon-dark"}
          ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {status === "success" ? "✓ Subscribed" : "Subscribe"}
      </button>

      {message && (
        <p className={`mt-2 ${status === "error" ? "text-red-700" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
}

export default EmailInput;