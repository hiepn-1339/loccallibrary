import { AppDataSource } from '../data-source';
import { Author } from '../entities/author.entity';

const authorRepository = AppDataSource.getRepository(Author);

export const authorList = async () => {
  return await authorRepository.find({
    order: { firstName: 'ASC' },
  });
};