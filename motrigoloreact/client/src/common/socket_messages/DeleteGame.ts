export class DeleteGameRequest {
    static Message = 'DeleteGameRequest';

    public gameId: string;

    constructor(gameId: string) {
        this.gameId = gameId;
    }
}

export class DeleteGameResponse {
    static Message = 'DeleteGameResponse';

    public gameId: string;

    constructor(gameId: string) {
        this.gameId = gameId;
    }
}
