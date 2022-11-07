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
import { Address } from './address.entity';
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

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
