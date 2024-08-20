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
            console.log('inventaire de carte vide, rien à remove');
            return '';
        }

        this.cardsInventory = this.cardsInventory.filter((card) => card !== cardToRemove);

        console.log(`carte ${cardToRemove} removed de l'inventaire`);
        return cardToRemove;
    }
}

export default PlayerModel;
