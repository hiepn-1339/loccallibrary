import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: false,
  })
  firstName: string | undefined;

  @Column({
    name: 'family_name',
    type: 'varchar',
    nullable: false,
  })
  familyName: string | undefined;

  @Column({
    name: 'date_of_birth',
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date | undefined;

  @Column({
    name: 'date_of_death',
    type: 'date',
    nullable: true,
  })
  dateOfDeath: Date | undefined;

  get name(): string {
    return `${this.firstName} ${this.familyName}`;
  }

  get url(): string {
    return 'something';
  }

  @OneToMany(() => Book, (book) => book.author)
  books: Book[] | undefined;
}
