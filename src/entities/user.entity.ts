import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Adress } from './adress.entity';
import { Position } from './position.entity';
import { Request } from './requests.entity';
import { SocialNetWork } from './socialNetwork.entity';
import { Team } from './team.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  age: number;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  telephone: string;

  @Column()
  isExercising: boolean;

  @Column()
  urlImg: string;

  @OneToOne(() => SocialNetWork, { eager: true })
  @JoinColumn()
  SocialNetwork: SocialNetWork[];

  @OneToOne(() => Adress, { eager: true })
  @JoinColumn()
  address: Adress;

  @OneToOne(() => Position, { eager: true })
  @JoinColumn()
  positions: Position;

  @OneToOne(() => Request, (req) => req.users, { eager: true })
  @JoinColumn()
  request: Request[];

  @OneToOne(() => Team, (team) => team.users)
  @JoinColumn()
  team: Team[];
}
