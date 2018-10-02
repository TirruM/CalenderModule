import { CalenderModel } from './calender';
export class OportunityInstance{
    session_type_id: string ;
    start_time: string ;    
    end_time:string; 
    days:  Array<CalenderModel>; 
}