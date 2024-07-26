import { Socket } from 'socket.io';
import GameModel from '../models/GameModel';
import { v4 } from 'uuid';
import { CreateGameRequest, CreateGameResponse } from '../../../../client/src/common/socket_messages/CreateGame';
import { ServerSocket } from '../../socket';
import { JoinGameRequest, JoinGameResponse } from '../../../../client/src/common/socket_messages/JoinGame';

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
            ServerSocket.instance.games.push(this.gameModel);

            this.socket.join(this.gameModel.gameId);
            this.socket.emit(CreateGameResponse.Message, new CreateGameResponse(this.gameModel.gameId));
        });

        this.socket.on(JoinGameRequest.Message, (args: JoinGameRequest) => {
            console.log(args);
            console.log(this.gameModel);
            if (this.gameModel === undefined) {
                return;
            }

            this.gameModel.addPlayer(this.socket.id);

            this.socket.join(args.gameId);
            this.socket.emit(JoinGameResponse.Message, new JoinGameResponse(this.gameModel.gameId));
        });
    }
}

export default GameSocketListener;
