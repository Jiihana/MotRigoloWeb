export class GetCardPiocheRequest {
    static Message = 'GetCardPiocheRequest';
}

export class GetCardPiocheResponse {
    static Message = 'GetCardPiocheResponse';

    public cardPioche: string;
    public piocheEmpty: boolean;

    constructor(cardPioche: string, piocheEmpty: boolean) {
        this.cardPioche = cardPioche;
        this.piocheEmpty = piocheEmpty;
    }
}
