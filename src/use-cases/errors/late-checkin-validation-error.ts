export class LateCheckinValidationError extends Error {
    constructor() {
        super("The time to validate the checkin has expired");
    }
}