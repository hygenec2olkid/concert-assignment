import { History } from 'src/features/history/entity/history.entity';
import { Ticket } from 'src/features/concert/entities/ticket.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('concerts')
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Column({ type: 'int' })
  total_seat: number;

  @Column({ type: 'int' })
  available_seat: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.concert)
  tickets: Ticket[];

  @OneToMany(() => History, (history) => history.concert)
  histories: History[];
}
