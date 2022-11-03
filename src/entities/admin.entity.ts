import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('admins') 
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string
}