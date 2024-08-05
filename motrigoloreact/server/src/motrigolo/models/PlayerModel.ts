class PlayerModel {
    public playerId: string;
    public cardsInventory: string[];

    constructor(playerId: string) {
        this.playerId = playerId;
        this.cardsInventory = [];
    }

    public addCardToInventory(card: string): string {
        if (this.cardsInventory.length >= 3) {
            return '';
        }

        if (card == '') {
            return '';
        }

        this.cardsInventory.push(card);

        return card;
    }

    public removeCardFromInventory(cardToRemove: string): string {
        if (this.cardsInventory.length == 0) {
            return '';
        }

        this.cardsInventory = this.cardsInventory.filter((card) => card !== cardToRemove);

        this.cardsInventory.forEach((CardInventory) => {
            console.log(CardInventory);
        });

        if (this.cardsInventory.length == 0) {
            console.log('card inventory EMPTY');
        }

        return cardToRemove;
    }
}

export default PlayerModel;
