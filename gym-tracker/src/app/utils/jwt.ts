import { User, UserRole } from '../core/auth/auth.model';

export const TOKEN_KEY = 'auth_token';

type JwtPayload = {
  exp?: number;
  firstName?: string;
  lastName?: string;
  role?: string;
};

function decodePayload(token: string): JwtPayload | null {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

function toUser(p: JwtPayload): User | null {
  const role = Object.values(UserRole).find((r) => r === p.role);
  if (!role || !p.firstName || !p.lastName) return null;
  return { firstName: p.firstName, lastName: p.lastName, role };
}

export function readSession(token: string | null): { token: string; user: User } | null {
  if (!token) return null;
  const payload = decodePayload(token);
  if (!payload) return null;
  if (!payload.exp || payload.exp * 1000 <= Date.now()) return null;
  const user = toUser(payload);
  return user ? { token, user } : null;
}
