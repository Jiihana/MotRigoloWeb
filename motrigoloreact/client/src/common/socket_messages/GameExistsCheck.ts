export class CheckGameExistsRequest {
    static Message = 'CheckGameExistsRequest';

    public gameId: string;

    constructor(gameId: string) {
        this.gameId = gameId;
    }
}

export class CheckGameExistsResponse {
    static Message = 'CheckGameExistsResponse';

    public gameExists: boolean;

    constructor(gameExists: boolean) {
        this.gameExists = gameExists;
    }
}
