// EmailInput.tsx
import { useState } from "react";

function EmailInput() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState(""); // Will store success or error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("http://localhost:3001/api/sub", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: "Server did not return valid JSON" };
      }


      if (res.ok) {
        setStatus("success");
        setMessage(data?.message || "Subscribed successfully!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
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
        <p
          className={`mt-2 ${status === "error" ? "text-red-700" : "text-green-600"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default EmailInput;
