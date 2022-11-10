import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';
import { User } from './user.entity';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 1 })
  status: number;

  @Column()
  positions: number;

  @ManyToOne(() => User, (user) => user.request)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Team, (team) => team.request)
  @JoinColumn()
  teams: Team;
}
