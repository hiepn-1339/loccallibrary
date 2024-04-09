import { AppDataSource } from '../data-source';
import { Genre } from '../entities/genre.entity';

const genreRepository = AppDataSource.getRepository(Genre);

export const genreList = async () => {
  return await genreRepository.find({
    order: { name: 'ASC' },
  });
};
