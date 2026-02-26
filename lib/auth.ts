export type UserRole = "ADMIN" | "USER";

export type StoredSession = {
  id?: number;
  role: UserRole;
  email?: string;
  username?: string;
};

const LOCAL_STORAGE_KEY = "blog_user_session";
const SESSION_STORAGE_KEY = "blog_user_session_temp";
const PROFILE_STORAGE_KEY = "blog_user_profile";

const parseStoredSession = (value: string | null): StoredSession | null => {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<StoredSession>;
    return {
      ...(typeof parsed.id === "number" ? { id: parsed.id } : {}),
      role: parsed.role === "ADMIN" ? "ADMIN" : "USER",
      ...(parsed.email ? { email: parsed.email } : {}),
      ...(parsed.username ? { username: parsed.username } : {}),
    };
  } catch {
    return null;
  }
};

export const getStoredSession = (): StoredSession | null => {
  if (typeof window === "undefined") return null;

  const fromSessionStorage = parseStoredSession(sessionStorage.getItem(SESSION_STORAGE_KEY));
  if (fromSessionStorage) return fromSessionStorage;

  const fromLocalStorage = parseStoredSession(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (fromLocalStorage) return fromLocalStorage;

  return parseStoredSession(localStorage.getItem(PROFILE_STORAGE_KEY));
};

export const setStoredSession = (session: StoredSession, rememberMe = false) => {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify(session);
  localStorage.setItem(PROFILE_STORAGE_KEY, payload);

  if (rememberMe) {
    localStorage.setItem(LOCAL_STORAGE_KEY, payload);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }

  sessionStorage.setItem(SESSION_STORAGE_KEY, payload);
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const clearStoredSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
};
