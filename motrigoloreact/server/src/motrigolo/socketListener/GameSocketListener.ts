import { Socket } from 'socket.io';
import GameModel from '../models/GameModel';
import { v4 } from 'uuid';
import { CreateGameRequest } from '../../../../client/src/common/socket_messages/CreateGame';

class GameSocketListener {
    private socket: Socket;
    private gameModel: GameModel | undefined = undefined;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public StartListening(): void {
        this.socket.on(CreateGameRequest.Message, () => {
            this.gameModel = new GameModel(v4());
            this.gameModel.addPlayer(this.socket.id);
        });
    }
}

export default GameSocketListener;
