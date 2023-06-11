import { Role } from './role.model';
import { User } from './user.model';

export interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface MenuItem {
  name: string;
  path: string;
  parentId: string | null;
  children: [MenuItem];
  icon: string;
}

export interface DecodedToken {
  iat: number;
  exp: number;
  user: User;
  role: Role;
  apiKey: string;
  permissions: Array<Object>;
  menus: Array<MenuItem>;
}
