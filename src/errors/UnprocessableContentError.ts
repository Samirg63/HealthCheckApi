import { ApiError } from "./ApiError";

export class UnprocessableContent extends ApiError{
    constructor(instance:string,detail:string = 'Some data are missing'){
        super(
            422,
            "Unprocessable Content",
            detail,
            instance
        )
    }
}