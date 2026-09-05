export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type RefreshResponse = {
  accessToken: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  displayName: string;
};

export type RegisterResponse = AuthUser & {
  createdAt: string;
};

export type UserProfile = AuthUser & {
  bio: string | null;
  location: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileRequest = {
  displayName?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
};
