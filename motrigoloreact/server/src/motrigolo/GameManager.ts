import { v4 } from 'uuid';
import GameModel from './models/GameModel';
import { ResultatValue } from './GameModelError';

export class GameManager {
    public static instance: GameManager;
    public games: GameModel[] = [];

    private gridSize = 6;

    constructor() {
        GameManager.instance = this;
    }

    getGame(gameId: string): ResultatValue<GameModel> {
        const game = this.games.find((game) => game.gameId == gameId);
        if (game == undefined) {
            return {
                success: false,
                message: 'La game est undefined.'
            };
        }

        return {
            success: true,
            value: game
        };
    }

    createGame(creator: string): GameModel {
        const gameModel = new GameModel(v4().slice(0, 4), this.gridSize);
        gameModel.addPlayer(creator);
        this.games.push(gameModel);
        return gameModel;
    }

    chooseWords(gameId: string): ResultatValue<string[]> {
        const game = this.getGame(gameId);

        if (!game.success) {
            return {
                success: false,
                message: `${game.message} Impossible de choisir des mots`
            };
        }

        return {
            success: true,
            value: game.value.chooseRandomWords((this.gridSize - 1) * 2)
        };
    }

    removePlayerFromGame(socketId: string) {
        this.games.forEach((game) => {
            game.players.forEach((player) => {
                if (player.playerId == socketId) {
                    game.removePlayer(socketId);

                    if (game.players.length == 0) {
                        this.deleteGame(game);
                    }
                }
            });
        });
    }

    gameExists(gameId: string): boolean {
        return this.games.some((game) => game.gameId == gameId);
    }

    private deleteGame(currentGame: GameModel) {
        console.log('game deleted');
        this.games = this.games.filter((game) => game !== currentGame);
    }
}
