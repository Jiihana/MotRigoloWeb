import { Server, Socket } from 'socket.io';
import { GameManager } from './motrigolo/GameManager';
import { FlipOverCardRequest, FlipOverCardResponse } from '../../client/src/common/socket_messages/FlipOverCard';
import { SynchronizeGameValuesRequest, SynchronizeGameValuesResponse } from '../../client/src/common/socket_messages/SynchronizeGameValues';

export class GameServerSocket {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    StartListeners = (socket: Socket) => {
        socket.on(FlipOverCardRequest.Message, (args: FlipOverCardRequest) => {
            const rooms = Array.from(socket.rooms);
            const game = GameManager.instance.getGame(rooms[1]);

            if (game == undefined) {
                return;
            }

            const isCardRetournee = game.FlipOverCard(args.cardIndex);
            this.io.to(game.gameId).emit(FlipOverCardResponse.Message, new FlipOverCardResponse(args.cardIndex, isCardRetournee));
        });

        socket.on(SynchronizeGameValuesRequest.Message, () => {
            const rooms = Array.from(socket.rooms);
            const game = GameManager.instance.getGame(rooms[1]);

            if (game == undefined) {
                return;
            }

            const gridCardsState = game.SynchronizeCards();
            const gridCardsObject = Object.fromEntries(gridCardsState.entries());
            this.io.to(game.gameId).emit(SynchronizeGameValuesResponse.Message, new SynchronizeGameValuesResponse(gridCardsObject, game.piocheEmpty));
        });
    };
}
