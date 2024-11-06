import { Todo } from "src/todos/entity/todo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('monthly')
export class DialogMonthly {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task_id: number; // Ensure this is a foreign key

  @Column()
  title: string;

  @Column({ type: 'date', nullable: true })
  fromDate: string;

  @Column({ type: 'date', nullable: true })
  toDate: string;

  @Column({ type: 'simple-array', nullable: true })
  repeatDays: string[];

  @Column()
  months:number;

  @Column({type: 'json' , nullable:true} )
  TimeFrequency: Array<{ lsaHrs: number; lsaTime: string }>;



  @ManyToOne(() => Todo, (todo) => todo.monthlyTasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  todo: Todo;
}
