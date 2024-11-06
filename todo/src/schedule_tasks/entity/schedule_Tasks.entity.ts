import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('scheduleTasks')
export class ScheduleTasks {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    task_id:number;

    @Column()
    title:string;

    

  

}