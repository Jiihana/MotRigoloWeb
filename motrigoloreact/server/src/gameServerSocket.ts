import { Socket } from 'socket.io';
import { CreateGameRequest, CreateGameResponse } from '../../client/src/common/socket_messages/CreateGame';
import { JoinGameRequest, JoinGameResponse } from '../../client/src/common/socket_messages/JoinGame';
import { GetCardPiocheRequest, GetCardPiocheResponse } from '../../client/src/common/socket_messages/GetCardPioche';
import { GameManager } from './motrigolo/GameManager';

export class GameServerSocket {
    StartListeners = (socket: Socket) => {
        socket.on(GetCardPiocheRequest.Message, () => {
            const rooms = Array.from(socket.rooms);

            const game = GameManager.instance.getGame(rooms[1]);

            const randomCardPioche = game.addCardToPlayerInventory(socket.id);

            socket.emit(GetCardPiocheResponse.Message, new GetCardPiocheResponse(randomCardPioche));
        });

        socket.on(CreateGameRequest.Message, (args: CreateGameRequest) => {
            const gameModel = GameManager.instance.createGame(args.gridSize);
            gameModel.addPlayer(socket.id);

            socket.join(gameModel.gameId);
            socket.emit(CreateGameResponse.Message, new CreateGameResponse(gameModel.gameId, gameModel.gridSize));
        });

        socket.on(JoinGameRequest.Message, (args: JoinGameRequest) => {
            const game = GameManager.instance.getGame(args.gameId);
            game.addPlayer(socket.id);

            socket.join(args.gameId);
            socket.emit(JoinGameResponse.Message, new JoinGameResponse(game.gameId));
        });
    };
}
