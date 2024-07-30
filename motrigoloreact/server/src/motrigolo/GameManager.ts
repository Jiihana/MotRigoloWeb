import { v4 } from 'uuid';
import { CheckGameExistsResponse } from '../../../client/src/common/socket_messages/GameExistsCheck';
import GameModel from './models/GameModel';

export class GameManager {
    public static instance: GameManager;
    private games: GameModel[] = [];

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

    createGame(creator: string, gridSize: number): GameModel {
        const gameModel = new GameModel(v4().slice(0, 4), gridSize);
        gameModel.addPlayer(creator);
        this.games.push(gameModel);
        return gameModel;
    }

    gameExists(gameId: string): CheckGameExistsResponse {
        return new CheckGameExistsResponse(this.games.some((game) => game.gameId == gameId));
    }
}
