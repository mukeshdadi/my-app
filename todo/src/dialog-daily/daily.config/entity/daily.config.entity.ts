import { Todo } from "src/todos/entity/todo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('daily')
export class DialogDaily {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  task_id: number;  // Primary key for DialogDaily (changed from task_id)

  @Column()
  title: string;

  @Column()
  option: string;

  @Column({ type: 'date', nullable: true })
  fromDate: string;

  @Column({ type: 'date', nullable: true })
  toDate: string;

  @Column({ type: 'simple-array', nullable: true })
  repeatDays: string[];

  @Column({type: 'json' , nullable:true} )
  TimeFrequency: Array<{ lsaHrs: number; lsaTime: string }>;


  // Foreign key to the Todo entity
  @ManyToOne(() => Todo, (todo) => todo.dailyTasks , { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'task_id' })
  todo: Todo;
}


