import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/session";

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

// GET — lists weekly curriculum PDFs from Drive, keyed by domain + week.
// Same admin-session + shared-secret pattern as /api/admin/students.
export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(`${scriptUrl()}?action=curriculum&secret=${encodeURIComponent(apiSecret())}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to reach backend. Check APPS_SCRIPT_URL." }, { status: 502 });
  }
}
