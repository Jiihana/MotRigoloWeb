class PlayerModel {
    public playerId: string;
    public cardsInventory: string[];
    public cursorPath: string;

    constructor(playerId: string) {
        this.playerId = playerId;
        this.cardsInventory = [];
        this.cursorPath = this.getRandomCursor();
    }

    cursorsAvailable: string[] = [
        this.getCursorPath('blanc_0'),
        this.getCursorPath('blanc_1'),
        this.getCursorPath('bleu_0'),
        this.getCursorPath('bleu_1'),
        this.getCursorPath('rose_0'),
        this.getCursorPath('rose_1'),
        this.getCursorPath('vert_0'),
        this.getCursorPath('vert_1')
    ];

    public getRandomCursor(): string {
        const randomIndex = Math.floor(Math.random() * this.cursorsAvailable.length);
        this.cursorPath = this.cursorsAvailable[randomIndex];

        return this.cursorsAvailable[randomIndex];
    }

    private getCursorPath(path: string) {
        return `url(/images/cursors/${path}.png)`;
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
