import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/session";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

function scriptUrl() {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) throw new Error("APPS_SCRIPT_URL is not set");
  return url;
}

function apiSecret() {
  const s = process.env.APPS_SCRIPT_SECRET;
  if (!s) throw new Error("APPS_SCRIPT_SECRET is not set");
  return s;
}

// GET — list all students + summary stats, proxied from the Apps Script backend.
export async function GET(req: NextRequest) {
  const session = await requireAuth(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(`${scriptUrl()}?action=list&secret=${encodeURIComponent(apiSecret())}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to reach backend. Check APPS_SCRIPT_URL." }, { status: 502 });
  }
}

// POST — admin actions: updateStatus, edit, delete
export async function POST(req: NextRequest) {
  const session = await requireAuth(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  try {
    const res = await fetch(scriptUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, secret: apiSecret() }),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to reach backend. Check APPS_SCRIPT_URL." }, { status: 502 });
  }
}
