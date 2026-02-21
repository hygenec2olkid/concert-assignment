import { Concert } from 'src/features/concert/entities/concert.entity';
import { User } from 'src/features/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Concert, (concert) => concert.histories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'concert_id' })
  concert: Concert;

  @ManyToOne(() => User, (user) => user.histories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'createdAt' })
  createAt: Date;

  @Column({ length: 50 })
  action: string;
}
