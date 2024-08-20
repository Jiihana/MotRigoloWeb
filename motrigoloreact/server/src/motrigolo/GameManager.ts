import { v4 } from 'uuid';
import { CheckGameExistsResponse } from '../../../client/src/common/socket_messages/GameExistsCheck';
import GameModel from './models/GameModel';

export class GameManager {
    public static instance: GameManager;
    public games: GameModel[] = [];

    private gridSize = 6;

    constructor() {
        GameManager.instance = this;
    }

    getGame(gameId: string): GameModel | undefined {
        return this.games.find((game) => game.gameId == gameId);
    }

    createGame(creator: string): GameModel {
        const gameModel = new GameModel(v4().slice(0, 4), this.gridSize);
        gameModel.addPlayer(creator);
        this.games.push(gameModel);
        return gameModel;
    }

    private deleteGame(currentGame: GameModel) {
        this.games = this.games.filter((game) => game !== currentGame);
        console.log(`la game ${currentGame.gameId} a été delete`);
    }

    removePlayerFromGame(gameId: string, socketId: string) {
        const game = this.getGame(gameId);

        if (game == undefined) {
            return;
        }

        game.removePlayer(socketId);

        if (game.players.length == 0) {
            this.deleteGame(game);
        }
    }

    gameExists(gameId: string): CheckGameExistsResponse {
        return new CheckGameExistsResponse(this.games.some((game) => game.gameId == gameId));
    }
}
