import {ApiError} from './ApiError'

export class InternalServerError extends ApiError{
    constructor(instance:string, detail:string = "Unexpected Error"){
        super(
            500,
            'Internal Server Error',
            detail,
            instance
        )
    }
}