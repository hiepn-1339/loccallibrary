import { BookInstanceStatus } from './../constant/index';
import { AppDataSource } from '../data-source';
import { Book } from '../entities/book.entity';
import { Author } from '../entities/author.entity';
import { Genre } from '../entities/genre.entity';
import { BookInstance } from '../entities/bookInstance.entity';
import { In } from 'typeorm';

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

export const bookDetail = async (id: number) => {
  return await bookRepository.findOne({
    relations: ['author', 'genres', 'bookInstances'],
    where: { id: id },
  });
};

export const bookCreateGet = async () => {
  return await Promise.all([
    authorRepository.find({order: {firstName: 'ASC'}}),
    genreRepository.find({order: {name: 'ASC'}}),
  ]);
};

export const bookCreatePost = async (data) => {
  const book = new Book();
  book.title = data.title;
  book.author = data.author;
  book.summary = data.summary;
  book.isbn = data.isbn;
  book.genres = await genreRepository.find({
    where: { id: In(data.genres.map((item: string) => parseInt(item))) },
  });

  return bookRepository.create(book);
};

export const bookUpdatePost = async (book: Book, data: any) => {
  book.title = data.title;
  book.author = data.author;
  book.summary = data.summary;
  book.isbn = data.isbn;
  book.genres = await genreRepository.find({
    where: { id: In(data.genres.map((item: string) => parseInt(item))) },
  });

  return await bookRepository.save(book);
};

export const bookDelete = async (id: number) => {
  return await bookRepository.delete(id);
};
