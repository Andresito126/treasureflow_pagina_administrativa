import type { UserRepository } from '../domain/repositories/userRepository';
import type { AdminUser, UserStatus } from '../domain/entities/user';
import type { HttpClient } from '@/core/http/httpClient';

/** Shape returned by GET /api/v1/admin/users. */
interface AdminUserDto {
  id: string;
  userType: 'citizen' | 'establishment';
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  registrationDate: string;
  totalKg: number;
  completedCollections: number;
  lastActivity: string | null;
}

function toEntity(dto: AdminUserDto): AdminUser {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    role: dto.userType,
    status: dto.isActive ? 'active' : 'disabled',
    registeredAt: dto.registrationDate,
    stats: {
      totalKg: dto.totalKg,
      successfulCollections: dto.completedCollections,
      lastActivity: dto.lastActivity ?? dto.registrationDate,
    },
  };
}

export class ApiUserRepository implements UserRepository {
  private readonly http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  async list(): Promise<AdminUser[]> {
    const rows = await this.http.get<AdminUserDto[]>('/api/v1/admin/users');
    return rows.map(toEntity);
  }

  async getById(id: string): Promise<AdminUser | null> {
    const rows = await this.http.get<AdminUserDto[]>('/api/v1/admin/users');
    const found = rows.find((r) => r.id === id);
    return found ? toEntity(found) : null;
  }

  async setStatus(id: string, status: UserStatus): Promise<void> {
    await this.http.patch(`/api/v1/admin/users/${id}/status`, {
      isActive: status === 'active',
    });
  }

  async delete(id: string): Promise<void> {
    await this.http.delete(`/api/v1/admin/users/${id}`);
  }
}
