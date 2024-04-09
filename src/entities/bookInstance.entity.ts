import { Book } from './book.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class BookInstance {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  imprint: string | undefined;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  status: string | undefined;

  @Column({
    name: 'due_back',
    type: 'date',
    nullable: true,
  })
  dueBack: Date | undefined;

  @ManyToOne(() => Book, (book) => book.bookInstances)
  @JoinColumn({ name: 'book_id' })
  book: Book | undefined;

  get url(): string {
    return 'something';
  }
}
