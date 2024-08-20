export class LeaveGameRequest {
    static Message = 'LeaveGameRequest';

    public gameId: string;
    public socketId: string;

    constructor(gameId: string, socketId: string) {
        this.gameId = gameId;
        this.socketId = socketId;
    }
}
