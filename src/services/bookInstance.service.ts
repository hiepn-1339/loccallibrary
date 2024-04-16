import { AppDataSource } from '../data-source';
import { BookInstance } from '../entities/bookInstance.entity';

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

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
