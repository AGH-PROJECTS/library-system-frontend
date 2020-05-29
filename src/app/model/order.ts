import {User} from './user';
import {Book} from './book';

export interface Order {
  id: string;
  user: User;
  employeeRent: User;
  employeeReturn: User;
  book: Book;
  dateOfRent: string;
  dateOfReturn: string;
  status: string;
}
