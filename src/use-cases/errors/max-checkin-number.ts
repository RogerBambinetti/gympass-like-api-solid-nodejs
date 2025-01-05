export class MaxCheckinNumberError extends Error {
    constructor() {
        super("Max checkin number on same day was reached");
    }
}