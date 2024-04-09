import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, JoinColumn } from "typeorm"
import { Author } from "./author.entity"
import { Genre } from "./genre.entity";
import { BookInstance } from "./bookInstance.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({
    type: "varchar",
    nullable: false,
  })
  title: string | undefined;

  @Column({
    type: "varchar",
    nullable: false,
  })
  summary: string | undefined;

  @Column({
    type: "varchar",
    nullable: true
  })
  isbn: string | undefined;


  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: "author_id" })
  author: Author | undefined;

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres: Genre[] | undefined;

  @OneToMany(() => BookInstance, (bookInstance) => bookInstance.book)
  bookInstances: BookInstance[] | undefined;

  get url(): string {
    return 'something';
  }
}
