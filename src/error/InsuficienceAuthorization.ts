import { BaseError } from "./BaseError";

export class InsufficientAuthorization extends BaseError {
    constructor() {
        super("Autorização insuficiente", 401)
    }
}