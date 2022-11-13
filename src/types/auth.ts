export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  owner: Owner;
  access_token: string;
}

export interface Owner {
  id: number;
  username: string;
  store_name: string;
  store_description: string;
  created_at: Date;
  updated_at: Date;
}

export interface LoginRefreshResponse {
  access_token: string;
}
