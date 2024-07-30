export class JoinGameRequest {
    static Message = 'JoinGameRequest';

    public gameId: string;

    constructor(gameId: string) {
        this.gameId = gameId;
    }
}

export class JoinGameResponse {
    static Message = 'JoinGameResponse';

    public gameId: string;
    public gridSize: number;

    constructor(gameId: string, gridSize: number) {
        this.gameId = gameId;
        this.gridSize = gridSize;
    }
}
