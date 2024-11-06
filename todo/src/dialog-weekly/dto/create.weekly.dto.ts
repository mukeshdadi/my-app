export class CreateWeeklyDto{
    id:number;
    task_id:number;
    title:string;
    fromDate:string;
    toDate:string;
    repeatDays: string[];
    week: number;
    no_of_months: number;
    TimeFrequency: Array<{ lsaHrs: number; lsaTime: string }>;
}