import { UserDTO } from '../dto/UserDTO';

export type MethodStr = (data:string)=>void

export type MethodNumber = (data:number)=>void

export type MethodFile = (data:File)=>void

export type MethodUserDTO = (data:UserDTO)=>void
