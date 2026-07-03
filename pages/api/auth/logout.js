export default function handler(req, res) {
  res.setHeader('Set-Cookie', [
    'revoshop_token=; Path=/; Max-Age=0; SameSite=Lax',
    'revoshop_role=; Path=/; Max-Age=0; SameSite=Lax',
  ]);
  return res.status(200).json({ message: 'Logged out' });
}
