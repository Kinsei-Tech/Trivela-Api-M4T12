import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Adress } from './adress.entity';
import { Owner } from './owner.entity';
import { Team } from './team.entity';

@Entity('fields')
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('boolean', { default: true, nullable: true })
  isActive: boolean = true;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Owner, (owner) => owner, { eager: true })
  @JoinColumn()
  owner: Owner;

  @OneToOne(() => Adress, { eager: true })
  @JoinColumn()
  address: Adress;

  @ManyToMany(() => Team, (team) => team.fields)
  team: Team[];
}
