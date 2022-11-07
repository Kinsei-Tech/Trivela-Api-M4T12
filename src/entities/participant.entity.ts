import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';
import { User } from './user.entity';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  position: number;

  @ManyToMany(() => Team, (team) => team.id, { eager: true })
  @JoinTable()
  team: Team;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;
}
