import { User } from './user.model';

export interface Room {
  _id:       string;
  updatedAt: string;
  createdAt: string;
  creator:   User;
  name:      string;
  __v:       number;
  members:   User[];
}
