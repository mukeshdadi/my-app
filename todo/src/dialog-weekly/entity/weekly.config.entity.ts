import { Todo } from "src/todos/entity/todo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('weekly')
export class DialogWeekly {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  task_id: number; 

    @Column({ type: 'date', nullable: true })
    fromDate: string;

    @Column({ type: 'date', nullable: true })
    toDate: string;

    @Column({ type: 'simple-array', nullable: true })
    repeatDays: string[];

    @Column()
    title:string;

    @Column({type:'varchar' , nullable: true})
    week: number

    @Column({type: 'int' , nullable: true})
    no_of_months: number

    @Column({type: 'json' , nullable:true} )
    TimeFrequency: Array<{ lsaHrs: number; lsaTime: string }>;
    
    @ManyToOne(() => Todo, (todo) => todo.weeklyTasks , { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'task_id' })
  todo: Todo;


}