import { UserDTO } from './UserDTO';

export interface ChatDTO{
    id:number,
    title:string,
    avatar:string,
    unread_count:number,
    created_by:number,
    time:Date,
    content:string,
    last_message:{
        user:UserDTO
    }
}
