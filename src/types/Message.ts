export interface Message{
    id:number,
    value:string,
    myMessage:boolean,
    time:string,
    type:string
}

export type ListMessage = Array<{day:string, messages:Array<Message>}>
