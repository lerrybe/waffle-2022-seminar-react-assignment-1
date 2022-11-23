import { Owner } from './auth';
import { MenuType } from './menus';

export interface Review {
  id: number;
  content: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
  menu: MenuType;
  author: Owner;
}

export interface CreateReviewParams {
  content: string;
  rating: number;
  menu: number;
}

export interface UpdateReviewParams {
  content: string;
  rating: number;
}
