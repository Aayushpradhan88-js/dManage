class SuccessResponse {
    constructor(
        public statusCode: number,
        public data: any,
        public message: string,
        public status: string = "success",
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.status = status
    }
}