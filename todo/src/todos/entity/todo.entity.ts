
import { DialogDaily } from "src/dialog-daily/daily.config/entity/daily.config.entity";
import { DialogMonthly } from "src/dialog-monthly/monthly.config/entity/monthly.config.entity";
import { DialogWeekly } from "src/dialog-weekly/entity/weekly.config.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  description: string;

  @Column()
  role: string;

  @Column()
  fromDate: string;

  @Column()
  toDate: string;

  @Column({ type: 'simple-array', nullable: true })
  repeatDays: string[];

  @Column()
  repeatType: string; 

  @Column()
  status: string;

  @Column({ type: 'json', nullable: true })
  monthly: any;

  @Column({ type: 'json', nullable: true })
  daily: any;

  @Column({ type: 'json', nullable: true })
  weekly: any;

  @Column({ type: 'json', nullable: true })
  lsaEntries: { lsaHrs: number; lsaTime: string }[];

  @OneToMany(() => DialogDaily, (daily) => daily.todo) 
  dailyTasks: DialogDaily[];

  @OneToMany(() => DialogMonthly, (monthly) => monthly.todo)
  monthlyTasks: DialogMonthly[];

  @OneToMany(() => DialogWeekly, (weekly) => weekly.todo)
  weeklyTasks: DialogWeekly[];
}