import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('adresses')
export class Adress{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    street: string

    @Column() 
    district: string

    @Column()
    zipCode: string

    @Column({nullable: true})
    number: string

    @Column({nullable: true})
    complement: string

    @Column()
    city: string

    @Column()
    state: string

}