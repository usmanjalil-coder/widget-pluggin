import { cookies } from "next/headers";
export async function POST() {
  (await cookies()).delete("mock_session");
  return new Response(null, { status: 204 });
}
