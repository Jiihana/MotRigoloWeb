import PlayerModel from './PlayerModel';

class GameModel {
    public gameId: string;
    public players: PlayerModel[] = [];

    constructor(gameId: string) {
        this.gameId = gameId;
    }

    public addPlayer(playerId: string) {
        this.players.push(new PlayerModel(playerId));
    }
}

export default GameModel;
