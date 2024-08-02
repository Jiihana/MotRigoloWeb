import PlayerModel from './PlayerModel';

class GameModel {
    public gameId: string;
    public players: PlayerModel[] = [];
    public gridCards: string[];
    public gridSize: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    public GridCardsState = new Map();

    constructor(gameId: string, gridSize: number) {
        this.gameId = gameId;
        this.gridSize = gridSize;
        this.gridCards = this.setGridCards();
        this.GridCardsState = this.setGridCardsState();
    }

    public FlipOverCard(IndexCard: string) {
        if (this.GridCardsState.has(IndexCard)) {
            const value = this.GridCardsState.get(IndexCard);

            this.GridCardsState.set(IndexCard, !value);
        }
    }

    public addPlayer(playerId: string) {
        this.players.push(new PlayerModel(playerId));
    }

    public addCardToPlayerInventory(playerId: string): string {
        const player = this.players.find((player) => player.playerId == playerId);

        if (player == undefined) {
            throw new Error("player is undefined: couldn't add card to inventory");
        }

        const randomCard = this.drawRandomPiocheCard();
        player.cardsInventory.push(randomCard);

        return randomCard;
    }

    private drawRandomPiocheCard(): string {
        const pioche = this.getCardsPioche();
        const randomIndex = Math.floor(Math.random() * pioche.length);
        const randomCardPioche = pioche[randomIndex];
        console.log(randomCardPioche);
        return randomCardPioche;
    }

    private getCardsPioche(): string[] {
        let pioche = [...this.gridCards];

        this.players.forEach((player) => {
            player.cardsInventory.forEach((card) => {
                if (pioche.includes(card)) {
                    pioche = pioche.filter((piocheCard) => piocheCard != card);
                }
            });
        });

        return pioche;
    }

    private setGridCards(): string[] {
        let pioche = [];

        for (let numberIndex = 0; numberIndex < this.gridSize; numberIndex++) {
            for (let letterIndex = 0; letterIndex < this.gridSize; letterIndex++) {
                pioche.push(`${this.alphabet[letterIndex]}${numberIndex}`);
            }
        }

        return pioche;
    }

    private setGridCardsState(): Map<string, boolean> {
        let gridCardsState = new Map();

        this.setGridCards().forEach((gridCard) => {
            gridCardsState.set({ gridCard }, false);
        });

        return gridCardsState;
    }
}

export default GameModel;
