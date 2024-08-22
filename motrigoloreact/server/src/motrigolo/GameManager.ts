import { v4 } from 'uuid';
import { CheckGameExistsResponse } from '../../../client/src/common/socket_messages/GameExistsCheck';
import GameModel from './models/GameModel';
import GameModelError from './GameModelError';

export class GameManager {
    public static instance: GameManager;
    public games: GameModel[] = [];

    private gridSize = 6;

    constructor() {
        GameManager.instance = this;
    }

    getGame(gameId: string): GameModel | GameModelError {
        const game = this.games.find((game) => game.gameId == gameId);

        if (game == undefined) {
            return GameModelError.gameUndefined;
        }

        return game;
    }

    createGame(creator: string): GameModel {
        const gameModel = new GameModel(v4().slice(0, 4), this.gridSize);
        gameModel.addPlayer(creator);
        this.games.push(gameModel);
        return gameModel;
    }

    private deleteGame(currentGame: GameModel) {
        this.games = this.games.filter((game) => game !== currentGame);
    }

    removePlayerFromGame(gameId: string, socketId: string): void | GameModelError {
        const game = this.getGame(gameId);

        if (game instanceof GameModelError) {
            return new GameModelError(`${game.message} Impossible d'enlever le joueur de la game`);
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
