import { ApiError } from "./ApiError";

export class ConflictError extends ApiError{
    constructor(instance:string,detail:string = 'Some conflict happened'){
        super(
            409,
            'Conflict',
            detail,
            instance
        )
    }
}