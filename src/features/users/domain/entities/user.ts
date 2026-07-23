export type UserRole = 'citizen' | 'establishment';
export type UserStatus = 'active' | 'disabled';

export interface UserStats {
  /** Total recycled kilograms across the user's history. */
  totalKg: number;
  successfulCollections: number;
  /** ISO timestamp of the user's last activity. */
  lastActivity: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  /** ISO registration date. */
  registeredAt: string;
  stats: UserStats;
}
