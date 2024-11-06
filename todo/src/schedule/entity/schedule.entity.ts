import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedule')
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;
    

   
     @Column()
     task_id: number;

     @Column()
     title:string;
  
    
    @Column()
    status: string;

    @Column()
    lsaTime:string;

    @Column()
    lsaHrs:number;
  

    @Column()
    date_stamp:string;

}
