export class UpdateTodoDto {
    title?: string;
    description?: string;
    role?: string;
    fromDate?: string;
    toDate?: string;
    repeatDays?: string[];
    status?: string;
    lsaEntries?:Array<{ lsaHrs: number; lsaTime: string }>
    monthly: {
        task_id?: number;
        title?: string;
        fromDate?: string;
        toDate?: string;
        repeatDays?: string[];
        months?:number;
        TimeFrequency?: Array<{ lsaHrs: number; lsaTime: string }>;
      };
    
      daily:{
        task_id?: number    
        fromDate?: string;   
        toDate?: string;
        option?:string
        title?:string;
        repeatDays?: string[];
        TimeFrequency?: Array<{ lsaHrs: number; lsaTime: string }>;
      };
    
      weekly:{
        task_id?:number;
        title?:string;
        fromDate?:string;
        toDate?:string;
        repeatDays?: string[];
        week?: number;
        no_of_months?: number;
        TimeFrequency?: Array<{ lsaHrs: number; lsaTime: string }>;
      };
}
