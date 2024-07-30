import { Socket } from 'socket.io';
import { v4 } from 'uuid';
import GameModel from './motrigolo/models/GameModel';
import { CheckGameExistsResponse } from '../../client/src/common/socket_messages/GameExistsCheck';
import { CreateGameRequest, CreateGameResponse } from '../../client/src/common/socket_messages/CreateGame';
import { JoinGameRequest, JoinGameResponse } from '../../client/src/common/socket_messages/JoinGame';
import { GetCardPiocheRequest, GetCardPiocheResponse } from '../../client/src/common/socket_messages/GetCardPioche';

export class GameServerSocket {
    public games: GameModel[] = [];

    gameExists = (gameId: string): CheckGameExistsResponse => {
        return new CheckGameExistsResponse(this.games.some((game) => game.gameId == gameId));
    };

    StartListeners = (socket: Socket) => {
        socket.on(GetCardPiocheRequest.Message, () => {
            const rooms = Array.from(socket.rooms);

            const game = this.games.find((game) => game.gameId == rooms[1]);

            if (game === undefined) {
                return; // ToDo : thrw ?
            }

            const randomIndex = Math.floor(Math.random() * game?.cardAvailablePioche.length);
            const randomCardPioche = game?.cardAvailablePioche[randomIndex];

            console.log(randomCardPioche);

            socket.emit(GetCardPiocheResponse.Message, new GetCardPiocheResponse(randomCardPioche));
        });

        socket.on(CreateGameRequest.Message, (args: CreateGameRequest) => {
            const gameModel = new GameModel(v4().slice(0, 4), args.gridSize);
            gameModel.addPlayer(socket.id);
            this.games.push(gameModel);

            socket.join(gameModel.gameId);
            socket.emit(CreateGameResponse.Message, new CreateGameResponse(gameModel.gameId, gameModel.gridSize));
        });

        socket.on(JoinGameRequest.Message, (args: JoinGameRequest) => {
            const game = this.games.find((game) => game.gameId == args.gameId);
            if (game === undefined) {
                return; // ToDo : thrw ?
            }

            game.addPlayer(socket.id);

            socket.join(args.gameId);
            socket.emit(JoinGameResponse.Message, new JoinGameResponse(game.gameId));
        });
    };
}
