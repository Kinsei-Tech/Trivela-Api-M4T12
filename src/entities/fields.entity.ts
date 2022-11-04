import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
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

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Owner, (owner) => owner, { eager: true })
  @JoinColumn()
  owners: Owner;

  @OneToOne(() => Adress, { eager: true })
  @JoinColumn()
  adresses: Adress;

  @OneToMany(() => Team, (team) => team.fields)
  team: Team[];
}
