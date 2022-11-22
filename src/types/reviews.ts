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
