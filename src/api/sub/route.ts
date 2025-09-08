export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Valid email required" }), { status: 400 });
  }

  const resp = await fetch(
    `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.BEEHIIV_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        // optional flags/metadata:
        send_welcome_email: true,
        reactivate_existing: true,
        utm_source: "website",
        utm_medium: "organic",
        // referring_site: "https://your-domain.com",
        // If you created an automation with "Add by API" trigger:
        // automation_ids: ["aut_xxxxxxxxxxxxxxxxxxxxxx"]
      }),
    }
  );

  if (!resp.ok) {
    const text = await resp.text();
    return new Response(JSON.stringify({ error: "Beehiiv error", details: text }), { status: resp.status });
  }

  return Response.json({ ok: true });
}
