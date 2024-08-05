export class RemoveCardFromInventoryRequest {
    static Message = 'RemoveCardFromInventoryRequest';

    public card: string;

    constructor(card: string) {
        this.card = card;
    }
}

export class RemoveCardFromInventoryResponse {
    static Message = 'RemoveCardFromInventoryResponse';

    public card: string;

    constructor(card: string) {
        this.card = card;
    }
}
