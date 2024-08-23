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
    public chosenWords: string[];

    constructor(gameId: string, gridSize: number, chosenWord: string[]) {
        this.gameId = gameId;
        this.gridSize = gridSize;
        this.chosenWords = chosenWord;
    }
}
