import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.MAILCHIMP_API_KEY;
  const listId = import.meta.env.MAILCHIMP_LIST_ID;
  const dc = import.meta.env.MAILCHIMP_DC;

  if (!apiKey || !listId || !dc) {
    return new Response(JSON.stringify({ error: "server_misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let email: string;
  try {
    const body = await request.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "invalid_email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;
  const credentials = btoa(`anystring:${apiKey}`);

  const mcRes = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email, status: "subscribed" }),
  });

  if (mcRes.ok) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = (await mcRes.json()) as { title?: string };
  if (data.title === "Member Exists") {
    return new Response(JSON.stringify({ error: "already_subscribed" }), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "mailchimp_error" }), {
    status: 502,
    headers: { "Content-Type": "application/json" },
  });
};
