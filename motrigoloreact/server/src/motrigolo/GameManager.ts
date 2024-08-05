import { v4 } from 'uuid';
import { CheckGameExistsResponse } from '../../../client/src/common/socket_messages/GameExistsCheck';
import GameModel from './models/GameModel';

export class GameManager {
    public static instance: GameManager;
    public games: GameModel[] = [];

    private gridSize = 2;

    constructor() {
        GameManager.instance = this;
    }

    getGame(gameId: string): GameModel {
        const game = this.games.find((game) => game.gameId == gameId);
        if (game == undefined) {
            throw new Error('Cannot find game: game is undefined');
        }

        return game;
    }

    createGame(creator: string): GameModel {
        const gameModel = new GameModel(v4().slice(0, 4), this.gridSize);
        gameModel.addPlayer(creator);
        this.games.push(gameModel);
        return gameModel;
    }

    deleteGame(gameId: string) {
        if (this.games.find((game) => game.gameId == gameId) != undefined) {
            this.games = this.games.filter((game) => game.gameId !== gameId);
            console.log(`la game ${gameId} a été delete`);
        }
    }

    gameExists(gameId: string): CheckGameExistsResponse {
        return new CheckGameExistsResponse(this.games.some((game) => game.gameId == gameId));
    }
}
