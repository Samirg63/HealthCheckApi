import { ApiError } from "./ApiError";

export class UnauthorizedError extends ApiError{
    constructor(instance:string,detail:string = "Invalid token"){
        super(
            401,
            "Unauthorized",
            detail,
            instance
        )

    }
}