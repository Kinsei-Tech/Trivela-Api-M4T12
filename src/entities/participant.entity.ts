import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entity";
import { User } from "./user.entity";

@Entity('participants')
export class Participant{ 
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    position: number

    @ManyToOne(() => Team, (team) => team.id, {eager: true})
    @JoinColumn()
    teams: Team

    @OneToOne(() => User, {eager: true})
    @JoinColumn()
    users: User

}