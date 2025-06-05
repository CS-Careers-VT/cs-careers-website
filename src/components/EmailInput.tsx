import { useState } from "react";

function EmailInput() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://corsproxy.io/?https://api.beehiiv.com/v2/forms/477cd612-259a-4a0d-b1d6-e4f8ac16e43a/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
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

      {status === "error" && (
        <p className="mt-2 text-red-700">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

export default EmailInput;
