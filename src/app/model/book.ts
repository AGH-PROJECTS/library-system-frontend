import {Category} from './category';
import {Author} from './author';
import {Publisher} from './publisher';

export interface Book {
  id: string;
  isbn: string;
  category: Category;
  title: string;
  author: Author;
  publisher: Publisher;
  yearOfPublish: string;
}
