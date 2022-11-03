import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('positions')
export class Position{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    target: boolean

    @Column()
    goalkeeper: boolean

    @Column()
    leftwing: boolean
 
    @Column()
    rightwing: boolean

    @Column()
    fixed: boolean
}