import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entity";
import { User } from "./user.entity";

@Entity('requests')
export class Request{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    status: number
 
    @Column()
    positions: number

    @ManyToOne(() => User, (user) => user.request)
    @JoinColumn()
    users: User

    @ManyToOne(() => Team, (team) => team.request)
    @JoinColumn()
    teams: Team
}