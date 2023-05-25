export default class AppError extends Error {
    message: string;
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.message = message;
        this.status = status;
    }
}