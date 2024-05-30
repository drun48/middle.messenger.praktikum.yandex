import { ChatDTO } from './ChatDTO';

export interface DeleteChatDTO{
    userId:number,
    result:Omit<ChatDTO, 'unread_count' | 'time' | 'content' | 'last_message'>
}
