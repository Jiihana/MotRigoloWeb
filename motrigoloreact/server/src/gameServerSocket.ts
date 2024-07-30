import { Socket } from 'socket.io';
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
    };
}
