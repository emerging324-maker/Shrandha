import { NextRequest, NextResponse } from "next/server";

// Legacy Instamojo API (v1.1) — X-Api-Key / X-Auth-Token header auth.
// Get these from https://www.instamojo.com/developers/ once your account
// is approved. Use test.instamojo.com + sandbox keys while developing.
function apiBase() {
  return process.env.INSTAMOJO_MODE === "live"
    ? "https://www.instamojo.com/api/1.1"
    : "https://test.instamojo.com/api/1.1";
}

const REGISTRATION_FEE = "150"; // ₹150, matches the spec. Change here if the fee changes.

export async function POST(req: NextRequest) {
  const apiKey = process.env.INSTAMOJO_API_KEY;
  const authToken = process.env.INSTAMOJO_AUTH_TOKEN;
  if (!apiKey || !authToken) {
    return NextResponse.json({ error: "Payment gateway is not configured yet." }, { status: 500 });
  }

  const body = await req.json();
  const { name, email, phone, redirectUrl } = body;
  if (!name || !email || !phone || !redirectUrl) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    const params = new URLSearchParams({
      purpose: "Shrandha Labs — Internship Registration Fee",
      amount: REGISTRATION_FEE,
      buyer_name: name,
      email,
      phone,
      redirect_url: redirectUrl,
      send_email: "false",
      send_sms: "false",
      allow_repeated_payments: "false",
    });

    const res = await fetch(`${apiBase()}/payment-requests/`, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "X-Auth-Token": authToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    const data = await res.json();

    if (!data.success) {
      return NextResponse.json({ error: data.message || "Could not create payment request." }, { status: 502 });
    }

    return NextResponse.json({
      paymentRequestId: data.payment_request.id,
      longurl: data.payment_request.longurl,
    });
  } catch (err) {
    return NextResponse.json({ error: "Payment gateway request failed." }, { status: 502 });
  }
}
