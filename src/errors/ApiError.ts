export class ApiError extends Error{
    
    constructor(
        public status:number,
        public title:string,
        public detail:string,
        public instance:string
    ){
        super(detail);
        this.name = this.constructor.name;
    }
}