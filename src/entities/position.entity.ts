import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column()
  target: boolean;

  @Column()
  goalkeeper: boolean;

  @Column()
  leftwing: boolean;

  @Column()
  rightwing: boolean;

  @Column()
  fixed: boolean;
}
