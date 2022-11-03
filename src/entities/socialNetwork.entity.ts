import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('social networks')
export class SocialNetWork{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({nullable: true})
    linkedin: string

    @Column({nullable: true})
    whatsApp: string
 
    @Column({nullable: true})
    facebook: string

    @Column({nullable: true})
    tiktok: string

    @Column({nullable: true})
    instagram: string
}
