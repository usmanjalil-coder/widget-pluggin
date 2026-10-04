import { cookies } from "next/headers";
export async function POST() {
  /* Mock-only auth: replace with real identity provider later. */ (
    await cookies()
  ).set("mock_session", "demo", { httpOnly: true, path: "/", sameSite: "lax" });
  return Response.json({ ok: true });
}
