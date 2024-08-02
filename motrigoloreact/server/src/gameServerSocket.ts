import { Server, Socket } from 'socket.io';
import { GameManager } from './motrigolo/GameManager';
import { FlipOverCardRequest, FlipOverCardResponse } from '../../client/src/common/socket_messages/FlipOverCard';

export class GameServerSocket {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    StartListeners = (socket: Socket) => {
        socket.on(FlipOverCardRequest.Message, (args: FlipOverCardResponse) => {
            const rooms = Array.from(socket.rooms);
            const game = GameManager.instance.getGame(rooms[1]);

            const isCardRetournee = game.FlipOverCard(args.cardIndex);
            this.io.to(game.gameId).emit(FlipOverCardResponse.Message, new FlipOverCardResponse(args.cardIndex, isCardRetournee));
        });
    };
}
