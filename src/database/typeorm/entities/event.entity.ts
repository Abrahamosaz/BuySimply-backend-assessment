import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventType: string;

  @Column('json')
  eventData: any;

  @Column({ default: false })
  processed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
