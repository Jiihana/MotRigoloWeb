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

    public FlipOverCard(IndexCard: string): boolean {
        if (this.GridCardsState.has(IndexCard)) {
            const value = this.GridCardsState.get(IndexCard);

            this.GridCardsState.set(IndexCard, !value);
            return !value;
        }

        throw new Error("La carte n'est pas inscrite dans les cartes existantes du jeu");
    }

    public SynchronizeCards(): Map<string, boolean> {
        return this.GridCardsState;
    }

    public addPlayer(playerId: string) {
        this.players.push(new PlayerModel(playerId));
    }

    public removePlayer(playerId: string) {
        this.players.push(new PlayerModel(playerId));

        this.players = this.players.filter((player) => player.playerId !== playerId);
    }

    public addCardToPlayerInventory(playerId: string): string {
        const player = this.players.find((player) => player.playerId == playerId);

        if (player == undefined) {
            throw new Error("player is undefined: couldn't add card to inventory");
        }

        const randomCard = this.drawRandomPiocheCard();

        return player.addCardToInventory(randomCard);
    }

    public removeCardFromPlayerInventory(playerId: string, card: string): string {
        const player = this.players.find((player) => player.playerId == playerId);

        if (player == undefined) {
            throw new Error("player is undefined: couldn't add card to inventory");
        }

        return player.removeCardFromInventory(card);
    }

    private drawRandomPiocheCard(): string {
        const pioche = this.getCardsPioche();

        if (pioche.length == 0) {
            return '';
        }
        const randomIndex = Math.floor(Math.random() * pioche.length);
        const randomCardPioche = pioche[randomIndex];
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
            gridCardsState.set(gridCard.toString(), false);
        });

        return gridCardsState;
    }
}

export default GameModel;
