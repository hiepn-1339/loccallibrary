import { BookInstanceStatus } from './../constant/index';
import { AppDataSource } from '../data-source';
import { Book } from '../entities/book.entity';
import { Author } from '../entities/author.entity';
import { Genre } from '../entities/genre.entity';
import { BookInstance } from '../entities/bookInstance.entity';

const bookRepository = AppDataSource.getRepository(Book);
const authorRepository = AppDataSource.getRepository(Author);
const genreRepository = AppDataSource.getRepository(Genre);
const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const index = async () => {
  return await Promise.all([
    bookRepository.count(),
    bookInstanceRepository.count(),
    bookInstanceRepository.findAndCount({
      where: { status: BookInstanceStatus.Available },
    }),
    authorRepository.count(),
    genreRepository.count(),
  ]);
};

export const bookList = async () => {
  return await bookRepository.find({
    order: { title: 'ASC' },
    relations: ['author'],
  });
};
