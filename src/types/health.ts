export interface IHealthResponse{
    backend:IHealth,
    frontend?:IHealth,
    apis?:{[key:string]:IHealth}[],
    database?:IHealth
}

export interface IHealth{
    success:boolean,
    error?:{
        statusCode:number,
    }
}