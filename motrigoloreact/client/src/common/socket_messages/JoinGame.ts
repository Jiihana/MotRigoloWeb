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
    public chosenWords: string[];

    constructor(gameId: string, gridSize: number, chosenWords: string[]) {
        this.gameId = gameId;
        this.gridSize = gridSize;
        this.chosenWords = chosenWords;
    }
}
