export class CreateGameRequest {
    static Message = 'CreateGameRequest';

    public gridSize = 6;
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
