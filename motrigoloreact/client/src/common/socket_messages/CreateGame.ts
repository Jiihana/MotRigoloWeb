export class CreateGameRequest {
    static Message = 'CreateGameRequest';

    public socketId: string;

    constructor(socketId: string) {
        this.socketId = socketId;
    }
}

export class CreateGameResponse {
    static Message = 'CreateGameResponse';

    public gameId: string;
    public gridSize: number;

    constructor(gameId: string, gridSize: number) {
        this.gameId = gameId;
        this.gridSize = gridSize;
    }
}
