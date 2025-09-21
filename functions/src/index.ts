import { setGlobalOptions } from "firebase-functions";
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

setGlobalOptions({ maxInstances: 10 });

// Get environment variables
const apiKey = functions.config().key;
const publicationId = functions.config().pub_id;

exports.subscribe = functions.https.onRequest(async (req: any, res: any) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { email } = req.body;
      
      // Validate email
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "Valid email required" });
      }

      // Check if environment variables are available
      if (!apiKey || !publicationId) {
        console.error("Missing environment variables");
        return res.status(500).json({ error: "Server configuration error" });
      }

      const resp = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            send_welcome_email: true,
            reactivate_existing: true,
            utm_source: "website",
            utm_medium: "organic",
          }),
        }
      );

      const data = await resp.json();

      if (!resp.ok) {
        console.error("Beehiiv API error:", data);
        const message =
          data?.error?.message ||
          data?.detail ||
          "Subscription failed. Please try again.";
        return res.status(resp.status).json({ error: message });
      }

      res.status(200).json({ ok: true, message: "Subscribed successfully!" });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Server error. Please try again." });
    }
  });
});