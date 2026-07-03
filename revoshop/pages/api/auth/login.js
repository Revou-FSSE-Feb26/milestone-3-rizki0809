const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

function serializeCookie(name, value, maxAgeSeconds) {
  return `${name}=${value}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const maxAge = 60 * 60 * 8;
    res.setHeader('Set-Cookie', [
      serializeCookie('revoshop_token', 'admin-local-token', maxAge),
      serializeCookie('revoshop_role', 'admin', maxAge),
    ]);
    return res.status(200).json({
      user: { username: ADMIN_USERNAME, role: 'admin' },
      token: 'admin-local-token',
    });
  }

  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const data = await response.json();
    const token = data.token || 'user-token';
    const maxAge = 60 * 60 * 8;

    res.setHeader('Set-Cookie', [
      serializeCookie('revoshop_token', token, maxAge),
      serializeCookie('revoshop_role', 'user', maxAge),
    ]);

    return res.status(200).json({
      user: { username, role: 'user' },
      token,
    });
  } catch (err) {
    return res.status(502).json({ message: 'Unable to reach authentication service' });
  }
}
