export class GetCardPiocheRequest {
    static Message = 'GetCardPiocheRequestRequest';
}

export class GetCardPiocheResponse {
    static Message = 'GetCardPiocheResponse';

    public cardPioche: string;

    constructor(cardPioche: string) {
        this.cardPioche = cardPioche;
    }
}
