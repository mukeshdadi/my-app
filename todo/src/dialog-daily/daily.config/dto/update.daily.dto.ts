

export class UpdateDailyDto {
    id:number;

    task_id: number;
    
    fromDate?: string;
    
    toDate?: string;

    option?:string

    title?:string;

    repeatDays?: string[];

    TimeFrequency?: Array<{ lsaHrs: number; lsaTime: string }>;
   
  
}
