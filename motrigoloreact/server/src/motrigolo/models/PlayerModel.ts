class PlayerModel {
    public playerId: string;
    public cardsInventory: string[];
    public cursorPositionX: number;
    public cursorPositionY: number;
    public cursorIndex: number;

    constructor(playerId: string, cursorPositionX: number, cursorPositionY: number) {
        this.playerId = playerId;
        this.cardsInventory = [];
        this.cursorPositionX = cursorPositionX;
        this.cursorPositionY = cursorPositionY;
        this.cursorIndex = -1;
    }

    cursorsAvailable: string[] = [
        this.getCursorPath('blanc_0'),
        this.getCursorPath('blanc_1'),
        this.getCursorPath('bleu_1'),
        this.getCursorPath('bleu_0')
    ];

    public getRandomCursor(): string {
        const randomIndex = Math.floor(Math.random() * this.cursorsAvailable.length);
        this.cursorIndex = randomIndex;

        return this.cursorsAvailable[this.cursorIndex];
    }

    private getCursorPath(path: string) {
        return `url(/images/cursors/${path}.png)`;
    }

    public updateCursorPosition(x: number, y: number) {
        this.cursorPositionX = x;
        this.cursorPositionY = y;
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
