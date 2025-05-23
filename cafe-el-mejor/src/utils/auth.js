export async function loginUser(mail, contraseña) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mail, contraseña }),
    credentials: 'include',
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Error al iniciar sesión');
  }

  return true;
}

export async function getSession() {
  const res = await fetch('/api/session', {
    credentials: 'include',
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.usuario || null;
}

export async function logoutUser() {
  await fetch('/api/logout', {
    method: 'POST',
    credentials: 'include',
  });
}
