export interface AdminSession {
  email: string;
  /** JWT access token. Empty string in the mock phase. */
  accessToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
