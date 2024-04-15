import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string | undefined;

  get url(): string {
    return 'something';
  }

  @ManyToMany(() => Book, (book) => book.genres)
  books: Book[] | undefined;
}
