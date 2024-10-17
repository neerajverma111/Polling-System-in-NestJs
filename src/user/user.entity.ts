import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User { 
    @PrimaryGeneratedColumn({type: 'bigint'})
    AID: number; //Aadhaar ID

    @Column()
    name: string;
    
    @Column()
    party_name: string;
}