export class AlertResponse {
    static Message = 'AlertResponse';

    public message: string;

    constructor(message: string) {
        this.message = message;
    }
}
