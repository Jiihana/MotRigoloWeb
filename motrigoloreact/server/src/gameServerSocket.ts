import { Server, Socket } from 'socket.io';
import { GameManager } from './motrigolo/GameManager';
import { FlipOverCardRequest, FlipOverCardResponse } from '../../client/src/common/socket_messages/FlipOverCard';
import { SynchronizeGameValuesRequest, SynchronizeGameValuesResponse } from '../../client/src/common/socket_messages/SynchronizeGameValues';
import { AlertResponse } from '../../client/src/common/socket_messages/Alert';
import GameModel from './motrigolo/models/GameModel';
import GameModelError from './motrigolo/GameModelError';

export class GameServerSocket {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    StartListeners = (socket: Socket) => {
        socket.on(SynchronizeGameValuesRequest.Message, () => {
            const rooms = Array.from(socket.rooms);

            const game = GameManager.instance.getGame(rooms[1]);

            if (game instanceof GameModelError) {
                socket?.emit(AlertResponse.Message, new AlertResponse(`${game.message} Impossible de synchroniser les valeurs de jeu`));
            }

            if (game instanceof GameModel) {
                const gridCardsState = game.SynchronizeCards();
                const gridCardsObject = Object.fromEntries(gridCardsState.entries());
                this.io
                    .to(game.gameId)
                    .emit(SynchronizeGameValuesResponse.Message, new SynchronizeGameValuesResponse(gridCardsObject, game.piocheEmpty));
            }
        });
    };
}
