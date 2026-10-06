export async function POST(request) {
  const { currentPassword, newPassword } = await request.json();
  if (!currentPassword) return Response.json({ error: "Enter your current password." }, { status: 400 });
  if (!newPassword || newPassword.length < 8) return Response.json({ error: "Use at least 8 characters for your new password." }, { status: 400 });
  return Response.json({ ok: true });
}
