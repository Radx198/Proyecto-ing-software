import users from '../data/users.json';

export function loginUser(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('session', JSON.stringify(user));
    return user;
  }
  return null;
}

export function getSession() {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem('session'));
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem('session');
}
