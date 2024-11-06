export class UpdateWeeklyDto{
    id:number;
    task_id:number;
    title?:string;
    fromDate?:string;
    toDate?:string;
    repeatDays?: string[];
    week?: string;
    no_of_months?: number;
    TimeFrequency?: Array<{ lsaHrs: number; lsaTime: string }>;
}