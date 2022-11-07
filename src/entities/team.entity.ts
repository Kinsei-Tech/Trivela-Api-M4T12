import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field } from './fields.entity';
import { Participant } from './participant.entity';
import { Position } from './position.entity';
import { Request } from './requests.entity';
import { User } from './user.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  maxWeight: number;

  @Column({ nullable: true })
  maxAge: number;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column('boolean', { default: true, nullable: true })
  isActive: boolean = true;

  @ManyToOne(() => User, (user) => user, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Field, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  fields: Field[];

  @OneToOne(() => Position, { eager: true })
  @JoinColumn()
  positions: Position;

  @ManyToMany(() => Participant, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  participants: Participant[];

  @OneToMany(() => Request, (req) => req.teams)
  request: Request[];
}
