import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { GameManager } from './motrigolo/GameManager';
import GameModel from './motrigolo/models/GameModel';
import { FlipOverCardResponse } from '../../client/src/common/socket_messages/FlipOverCard';
import { Resultat } from './motrigolo/GameModelError';
import { ModifyWordResponse } from '../../client/src/common/socket_messages/ModifyWord';
import { UpdateCursorPositionRequest, UpdateCursorPositionResponse } from '../../client/src/common/socket_messages/UpdateCursor';

export class ServerSocket {
    public static instance: ServerSocket;
    public io: Server;

    /** Master list of all connected users */
    public users: { [uid: string]: string };

    constructor(server: HttpServer) {
        ServerSocket.instance = this;
        this.users = {};
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });

        this.io.on('connect', this.StartListeners);
        console.info('Socket IO started');
    }

    AddSocketToRoom = async (socketId: string, gameId: string) => {
        const sockets = await this.io.fetchSockets();
        var player = sockets.find((x) => x.id == socketId);
        player?.join(gameId);
    };

    RemoveSocketFromRoom = async (socketId: string, gameId: string) => {
        const sockets = await this.io.fetchSockets();
        var player = sockets.find((x) => x.id == socketId);
        player?.leave(gameId);
    };

    ModifyWord = async (game: GameModel, word: string) => {
        const result = await game.modifyWord(word);
        if (result.success) {
            this.io.to(game.gameId).emit(ModifyWordResponse.Message, new ModifyWordResponse(word, result.value));
        }

        return result;
    };

    FlipOverCard = (game: GameModel, cardIndex: string): Resultat => {
        const result = game.FlipOverCard(cardIndex);
        if (result.success) {
            this.io.to(game.gameId).emit(FlipOverCardResponse.Message, new FlipOverCardResponse(cardIndex, result.value));
        }

        return result;
    };

    StartListeners = (socket: Socket) => {
        socket.on('handshake', (callback: (uid: string, users: string[]) => void) => {
            console.info('Handshake received from: ' + socket.id);

            const reconnected = Object.values(this.users).includes(socket.id);

            if (reconnected) {
                console.info('This user has reconnected.');

                const uid = this.GetUidFromSocketID(socket.id);
                const users = Object.values(this.users);

                if (uid) {
                    console.info('Sending callback for reconnect ...');
                    callback(uid, users);
                    return;
                }
            }

            const uid = v4();
            this.users[uid] = socket.id;

            const users = Object.values(this.users);
            console.info('Sending callback ...');
            callback(uid, users);

            this.SendMessage(
                'user_connected',
                users.filter((id) => id !== socket.id),
                users
            );
        });

        socket.on('disconnecting', async () => {
            console.info('Disconnect received from: ' + socket.id);

            const uid = this.GetUidFromSocketID(socket.id);
            GameManager.instance.removePlayerFromGame(socket.id);

            if (uid) {
                delete this.users[uid];

                const users = Object.values(this.users);

                this.SendMessage('user_disconnected', users, socket.id);
            }
        });

        socket.on(UpdateCursorPositionRequest.Message, (x: number, y: number) => {
            const rooms = Array.from(socket.rooms.values());

            const game = GameManager.instance.getGame(rooms[1]);
            if (!game.success) {
                return;
            }

            const player = game.value.players.find((player) => player.playerId === socket.id);
            if (player === undefined) {
                return;
            }

            this.io
                .to(rooms[1])
                .except(socket.id)
                .emit(UpdateCursorPositionResponse.Message, new UpdateCursorPositionResponse(x, y, socket.id, player.cursorPath));
        });
    };

    GetUidFromSocketID = (id: string) => {
        return Object.keys(this.users).find((uid) => this.users[uid] === id);
    };

    SendMessage = (name: string, users: string[], payload?: Object) => {
        console.info('Emitting event: ' + name + ' to', users);
        users.forEach((id) => (payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)));
    };
}
