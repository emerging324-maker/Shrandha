import { NextRequest, NextResponse } from "next/server";

function apiBase() {
  return process.env.INSTAMOJO_MODE === "live"
    ? "https://www.instamojo.com/api/1.1"
    : "https://test.instamojo.com/api/1.1";
}

// Re-checks the payment directly against Instamojo's servers — never trust
// the payment_status query param alone, since that's just a redirect hint
// and could be spoofed by editing the URL.
export async function POST(req: NextRequest) {
  const apiKey = process.env.INSTAMOJO_API_KEY;
  const authToken = process.env.INSTAMOJO_AUTH_TOKEN;
  if (!apiKey || !authToken) {
    return NextResponse.json({ error: "Payment gateway is not configured yet." }, { status: 500 });
  }

  const { paymentRequestId, paymentId } = await req.json();
  if (!paymentRequestId || !paymentId) {
    return NextResponse.json({ error: "Missing payment reference." }, { status: 400 });
  }

  try {
    const res = await fetch(`${apiBase()}/payment-requests/${paymentRequestId}/`, {
      headers: { "X-Api-Key": apiKey, "X-Auth-Token": authToken },
    });
    const data = await res.json();

    if (!data.success) {
      return NextResponse.json({ verified: false, error: "Could not look up payment." });
    }

    const payments = data.payment_request.payments || [];
    const match = payments.find((p: any) => p.payment_id === paymentId);
    const verified = !!match && match.status === "Credit";

    return NextResponse.json({ verified });
  } catch (err) {
    return NextResponse.json({ verified: false, error: "Verification request failed." }, { status: 502 });
  }
}
