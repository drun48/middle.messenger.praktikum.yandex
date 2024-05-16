import { ResourcesDTO } from './ResourcesDTO';

export interface MessageDTO{
    id:number,
    user_id:number,
    time:string,
    content:string,
    type:string,
    file?:ResourcesDTO
}
