export class APIError extends Error {
  statusCode: number;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.name = "APIError";
        this.statusCode = statusCode;
    }
}