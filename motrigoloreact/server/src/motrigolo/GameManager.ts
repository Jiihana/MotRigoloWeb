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

    async createGame(creator: string): Promise<ResultatValue<GameModel>> {
        const gameModel = new GameModel(v4().slice(0, 4), this.gridSize);
        gameModel.addPlayer(creator);
        this.games.push(gameModel);

        const result = await gameModel.chooseRandomWords();

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            value: gameModel
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
