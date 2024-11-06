export class CreateMonthlyDto {
    id:number;
    task_id:number;
    fromDate:string;
    toDate:string;
    title:string;
    months:number;
    repeatDays: string[];
    TimeFrequency: Array<{ lsaHrs: number; lsaTime: string }>;
   
} 