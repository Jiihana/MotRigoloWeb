export class FlipOverCardRequest {
    static Message = 'FlipOverCardRequest';

    public cardIndex: string;

    constructor(cardIndex: string) {
        this.cardIndex = cardIndex;
    }
}

export class FlipOverCardResponse {
    static Message = 'FlipOverCardResponse';

    public cardIndex: string;

    constructor(cardIndex: string) {
        this.cardIndex = cardIndex;
    }
}
