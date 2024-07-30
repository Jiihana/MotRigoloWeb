import http from 'http';
import express from 'express';
import { ServerSocket } from './socket';
import { CheckGameExistsRequest } from '../../client/src/common/socket_messages/GameExistsCheck';
import { GameServerSocket } from './gameServerSocket';
import { GameManager } from './motrigolo/GameManager';
import { CreateGameRequest, CreateGameResponse } from '../../client/src/common/socket_messages/CreateGame';
import { JoinGameRequest, JoinGameResponse } from '../../client/src/common/socket_messages/JoinGame';
import { GetCardPiocheRequest, GetCardPiocheResponse } from '../../client/src/common/socket_messages/GetCardPioche';

const application = express();

/** Server Handling */
const httpServer = http.createServer(application);

/** Start Socket */
new ServerSocket(httpServer, new GameServerSocket());

new GameManager();

/** Log the request */
application.use((req, res, next) => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
application.use(express.urlencoded({ extended: true }));
application.use(express.json());

/** Rules of our API */
application.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Healthcheck */
application.get('/ping', (req, res, next) => {
    return res.status(200).json({ hello: 'world!' });
});

/** Socket Information */
application.get('/status', (req, res, next) => {
    return res.status(200).json({ users: ServerSocket.instance.users });
});

application.get('/' + CheckGameExistsRequest.Message, (req, res, next) => {
    return res.status(200).json(GameManager.instance.gameExists(req.query['gameId'] as string));
});

application.get('/' + CreateGameRequest.Message, (req, res, next) => {
    var socketId = req.query['socketId'] as string;
    var game = GameManager.instance.createGame(socketId, 6);
    return res.status(200).json(new CreateGameResponse(game.gameId, game.gridSize));
});

application.get('/' + JoinGameRequest.Message, (req, res, next) => {
    var socketId = req.query['socketId'] as string;
    var gameId = req.query['gameId'] as string;
    var game = GameManager.instance.getGame(gameId);

    game.addPlayer(socketId);
    return res.status(200).json(new JoinGameResponse(gameId, game.gridSize));
});

application.get('/' + GetCardPiocheRequest.Message, (req, res, next) => {
    var socketId = req.query['socketId'] as string;
    var gameId = req.query['gameId'] as string;
    var game = GameManager.instance.getGame(gameId);
    const cardPiochee = game.addCardToPlayerInventory(socketId);

    return res.status(200).json(new GetCardPiocheResponse(cardPiochee));
});

/** Error handling */
application.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

/** Listen */
httpServer.listen(1337, () => console.info(`Server is running`));
