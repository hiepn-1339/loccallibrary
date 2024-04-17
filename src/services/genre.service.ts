import { AppDataSource } from '../data-source';
import { Genre } from '../entities/genre.entity';

const genreRepository = AppDataSource.getRepository(Genre);

export const genreList = async () => {
  return await genreRepository.find({
    order: { name: 'ASC' },
  });
};

export const genreDetail = async (id: number) => {
  return await genreRepository.findOne({
    relations: ['books'],
    where: { id: id },
  });
};

export const genreCreatePost = (data: any) => {
  const genre = new Genre();
  genre.name = data.name;
  return genreRepository.create(genre);
};

export const genreUpdatePost = async (genre: Genre, data: any) => {
  genre.name = data.name;
  return await genreRepository.save(genre);
};

export const genreDeletePost = async (id: number) => {
  await genreRepository.delete(id);
};
