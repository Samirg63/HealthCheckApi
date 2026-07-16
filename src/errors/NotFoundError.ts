import { ApiError } from "./ApiError";

export class NotFound extends ApiError{
    constructor(instance:string,detail:string = 'Data not found'){
        super(
        404,
        'Not Found',
        detail,
        instance
    )

    }
}