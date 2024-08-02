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
    public isCardRetournee: boolean;

    constructor(cardIndex: string, isCardRetournee: boolean) {
        this.cardIndex = cardIndex;
        this.isCardRetournee = isCardRetournee;
    }
}
