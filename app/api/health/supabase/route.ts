import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const expectedToken = process.env.SUPABASE_HEARTBEAT_TOKEN;
  const providedToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!expectedToken || providedToken !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Supabase heartbeat is missing server-side environment variables.");
    return NextResponse.json({ error: "Heartbeat is not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { error } = await supabase
    .from("quote_requests")
    .select("id", { head: true, count: "exact" });

  if (error) {
    console.error("Supabase heartbeat failed:", error.message);
    return NextResponse.json({ error: "Supabase heartbeat failed" }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    service: "supabase",
    timestamp: new Date().toISOString(),
  });
}
