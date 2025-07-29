export function isTokenExpired(): boolean {
  const expiry = localStorage.getItem('token_expiry');
  if (!expiry) return true;

  const now = Date.now();
  return now >= parseInt(expiry);
}