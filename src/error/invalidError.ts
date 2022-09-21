import { BaseError } from "./BaseError"

export class InvalidError extends BaseError {
    constructor(message: string) {
        super(message, 400)
    }
}