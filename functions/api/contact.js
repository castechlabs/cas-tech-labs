export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!firstName || !lastName || !email || !message) {
      return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!env.RESEND_API_KEY) {
      return Response.json({ error: "Contact form is not configured yet. Please email hr@castechlabs.com." }, { status: 503 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM || "CAS Tech Labs Website <onboarding@resend.dev>",
        to: ["hr@castechlabs.com"],
        reply_to: email,
        subject: `Website contact from ${firstName} ${lastName}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`
      })
    });

    if (!response.ok) {
      return Response.json({ error: "The message could not be sent. Please email hr@castechlabs.com directly." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "The message could not be sent. Please email hr@castechlabs.com directly." }, { status: 500 });
  }
}