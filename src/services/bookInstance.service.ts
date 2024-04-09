import { AppDataSource } from '../data-source';
import { Book } from '../entities/book.entity';
import { BookInstance } from '../entities/bookInstance.entity';

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);
const bookRepository = AppDataSource.getRepository(Book);

export const bookInstanceList = async () => {
  return await bookInstanceRepository.find({
    relations: ['book'],
    order: {
      book: {
        title: 'ASC',
      },
    },
  });
};

export const bookInstanceDetail = async (id: number) => {
  return await bookInstanceRepository.findOne({
    relations: ['book'],
    where: { id: id },
  });
};

export const bookInstanceCreateGet = async () => {
  return await bookRepository.find({});
};

export const bookInstanceCreatePost = (data: any) => {
  const bookInstance = new BookInstance();
  bookInstance.book = data.book;
  bookInstance.imprint = data.imprint;
  bookInstance.status = data.status;
  bookInstance.dueBack = data.dueBack ? data.dueBack : null;

  return bookInstanceRepository.create(bookInstance);
};

export const bookInstanceUpdatePost = async (bookInstance: BookInstance, data: any) => {
  bookInstance.book = data.book;
  bookInstance.imprint = data.imprint;
  bookInstance.status = data.status;
  bookInstance.dueBack = data.dueBack ? data.dueBack : null;

  return await bookInstanceRepository.save(bookInstance);
};

export const bookInstanceDeletePost = async (id: number) => {
  await bookInstanceRepository.delete(id);
};
