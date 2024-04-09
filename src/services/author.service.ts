import { AppDataSource } from '../data-source';
import { Author } from '../entities/author.entity';

const authorRepository = AppDataSource.getRepository(Author);

export const authorList = async () => {
  return await authorRepository.find({
    order: { firstName: 'ASC' },
  });
};

export const authorDetail = async (id: number) => {
  return await authorRepository.findOne({
    relations: ['books'],
    where: { id: id },
  });
};

export const authorCreate = (data: any) => {
  const author = new Author();
  author.firstName = data.firstName;
  author.familyName = data.familyName;
  author.dateOfBirth = data.dateOfBirth ? data.dateOfBirth : null;
  author.dateOfDeath = data.dateOfDeath ? data.dateOfDeath : null;

  return authorRepository.create(author);
};

export const authorUpdate = async (author: Author, data: any) => {
  author.firstName = data.firstName;
  author.familyName = data.familyName;
  author.dateOfBirth = data.dateOfBirth ? data.dateOfBirth : null;
  author.dateOfDeath = data.dateOfDeath ? data.dateOfDeath : null;

  return await authorRepository.save(author);
};

export const authorDelete = async (id: number) => {
  await authorRepository.delete(id);
};
