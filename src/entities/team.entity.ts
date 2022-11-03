import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field } from "./fields.entity";
import { Participant } from "./participant.entity";
import { Position } from "./position.entity";
import { Request } from "./requests.entity";
import { User } from "./user.entity";

@Entity('teams')
export class Team {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    state: string

    @Column()
    city: string

    @Column({nullable: true})
    maxWeight: number

    @Column({nullable: true})
    maxAge: number

    @ManyToOne(() => User, (user) => user, {eager: true})
    @JoinColumn()
    users: User[]

    @ManyToOne(() => Field, (field) => field, {eager: true})
    @JoinColumn()
    fields: Field[]

    @OneToOne(() => Position, {eager: true})
    @JoinColumn()
    positions: Position[]

    @ManyToOne(() => Participant, (participant) => participant, {eager: true, nullable: true})
    @JoinColumn()
    participants: Participant[]

    @OneToMany(() => Request, (req) => req.teams, )
    request: Request[]
}   