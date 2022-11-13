import { Owner } from './auth';

export interface MenuType {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
  rating?: number;
  created_at: Date;
  updated_at: Date;
  owner: Owner;
}

export {};
