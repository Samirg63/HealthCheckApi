import type {IError} from './Error'

export interface IResult<T>{
    status:number,
    success:boolean,
    data?:T,
    errors:IError[]
}