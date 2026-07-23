import { env } from '@/core/config/env';
import { createHttpClient } from '@/core/http/httpClient';
import { tokenStore } from '@/core/http/tokenStore';

import { LoginUseCase } from '@/features/auth/application/loginUseCase';
import { LogoutUseCase } from '@/features/auth/application/logoutUseCase';
import { GetCurrentSessionUseCase } from '@/features/auth/application/getCurrentSessionUseCase';
import type { AuthRepository } from '@/features/auth/domain/repositories/authRepository';
import { MockAuthRepository } from '@/features/auth/infrastructure/mockAuthRepository';
import { ApiAuthRepository } from '@/features/auth/infrastructure/apiAuthRepository';

import { ListUsersUseCase } from '@/features/users/application/listUsersUseCase';
import { SetUserStatusUseCase } from '@/features/users/application/setUserStatusUseCase';
import { DeleteUserUseCase } from '@/features/users/application/deleteUserUseCase';
import type { UserRepository } from '@/features/users/domain/repositories/userRepository';
import { MockUserRepository } from '@/features/users/infrastructure/mockUserRepository';
import { ApiUserRepository } from '@/features/users/infrastructure/apiUserRepository';

import { ListPostsUseCase } from '@/features/posts/application/listPostsUseCase';
import { DeletePostUseCase } from '@/features/posts/application/deletePostUseCase';
import type { PostRepository } from '@/features/posts/domain/repositories/postRepository';
import { MockPostRepository } from '@/features/posts/infrastructure/mockPostRepository';
import { ApiPostRepository } from '@/features/posts/infrastructure/apiPostRepository';

import { ListCollectionsUseCase } from '@/features/collections/application/listCollectionsUseCase';
import type { CollectionRepository } from '@/features/collections/domain/repositories/collectionRepository';
import { MockCollectionRepository } from '@/features/collections/infrastructure/mockCollectionRepository';
import { ApiCollectionRepository } from '@/features/collections/infrastructure/apiCollectionRepository';

import { GetDashboardStatsUseCase } from '@/features/dashboard/application/getDashboardStatsUseCase';
import type { StatsRepository } from '@/features/dashboard/domain/repositories/statsRepository';
import { MockStatsRepository } from '@/features/dashboard/infrastructure/mockStatsRepository';
import { ApiStatsRepository } from '@/features/dashboard/infrastructure/apiStatsRepository';

/**
 * Composition root. Wires repository implementations into use cases exactly
 * once. Presentation providers depend on the use cases exposed here — never on
 * repositories directly. Set VITE_USE_MOCKS=false (and VITE_GATEWAY_URL) to use
 * the API-backed repositories instead of the in-memory mocks.
 */
export interface AppContainer {
  auth: {
    login: LoginUseCase;
    logout: LogoutUseCase;
    getSession: GetCurrentSessionUseCase;
  };
  users: {
    list: ListUsersUseCase;
    setStatus: SetUserStatusUseCase;
    remove: DeleteUserUseCase;
  };
  posts: {
    list: ListPostsUseCase;
    remove: DeletePostUseCase;
  };
  collections: {
    list: ListCollectionsUseCase;
  };
  dashboard: {
    getStats: GetDashboardStatsUseCase;
  };
}

export function createContainer(): AppContainer {
  const http = createHttpClient(() => tokenStore.getAccessToken());
  const useMocks = env.useMocks;

  // --- infrastructure (repositories) — swap Mock* ⇄ Api* here only ---
  const authRepo: AuthRepository = useMocks
    ? new MockAuthRepository()
    : new ApiAuthRepository(http);
  const userRepo: UserRepository = useMocks
    ? new MockUserRepository()
    : new ApiUserRepository(http);
  const postRepo: PostRepository = useMocks
    ? new MockPostRepository()
    : new ApiPostRepository(http);
  const collectionRepo: CollectionRepository = useMocks
    ? new MockCollectionRepository()
    : new ApiCollectionRepository(http);
  const statsRepo: StatsRepository = useMocks
    ? new MockStatsRepository()
    : new ApiStatsRepository(http, collectionRepo);

  // --- application (use cases) ---
  return {
    auth: {
      login: new LoginUseCase(authRepo),
      logout: new LogoutUseCase(authRepo),
      getSession: new GetCurrentSessionUseCase(authRepo),
    },
    users: {
      list: new ListUsersUseCase(userRepo),
      setStatus: new SetUserStatusUseCase(userRepo),
      remove: new DeleteUserUseCase(userRepo),
    },
    posts: {
      list: new ListPostsUseCase(postRepo),
      remove: new DeletePostUseCase(postRepo),
    },
    collections: {
      list: new ListCollectionsUseCase(collectionRepo),
    },
    dashboard: {
      getStats: new GetDashboardStatsUseCase(statsRepo),
    },
  };
}
