import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
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
  socialNetwork: SocialNetWork;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @OneToOne(() => Position, { eager: true })
  @JoinColumn()
  positions: Position;

  @OneToMany(() => Request, (req) => req.user, { eager: true })
  @JoinColumn()
  request: Request[];

  @OneToMany(() => Team, (team) => team.user)
  @JoinColumn()
  team: Team[];
}
