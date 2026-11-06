import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('user_records')
@Unique(['id1', 'id2'])
export class UserRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id1: string;

  @Column()
  id2: string;

  @Column({ name: 'user_id' })
  userID: string;
}
