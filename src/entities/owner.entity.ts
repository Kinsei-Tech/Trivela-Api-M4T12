import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('owners')
export class Owner {
    @PrimaryGeneratedColumn('uuid')
    id: string 

    @Column()
    name: string

    @Column()
    email: string
    
    @Column()
    password: string
}