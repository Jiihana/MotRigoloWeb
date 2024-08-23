export class CheckGameExistsRequest {
    static Message = 'CheckGameExistsRequest';

    public gameId: string;

    constructor(gameId: string) {
        this.gameId = gameId;
    }
}
