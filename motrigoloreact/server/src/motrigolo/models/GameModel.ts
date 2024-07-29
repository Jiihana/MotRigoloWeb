import PlayerModel from './PlayerModel';

class GameModel {
    public gameId: string;
    public players: PlayerModel[] = [];
    public cardAvailablePioche: string[];
    public gridSize: number;
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    constructor(gameId: string, gridSize: number) {
        this.gameId = gameId;
        this.gridSize = gridSize;
        this.cardAvailablePioche = this.setCardsAvailablePioche();
    }

    public addPlayer(playerId: string) {
        this.players.push(new PlayerModel(playerId));
    }

    private setCardsAvailablePioche(): string[] {
        let pioche = [];

        for (let numberIndex = 0; numberIndex < this.gridSize; numberIndex++) {
            for (let letterIndex = 0; letterIndex < this.gridSize; letterIndex++) {
                pioche.push(`${this.alphabet[letterIndex]}${numberIndex}`);
            }
        }

        return pioche;
    }
}

export default GameModel;
