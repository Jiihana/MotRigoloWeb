import http from 'http';
import express from 'express';
import { ServerSocket } from './socket';
import { CheckGameExistsRequest } from '../../client/src/common/socket_messages/GameExistsCheck';
import { GameManager } from './motrigolo/GameManager';
import { CreateGameRequest, CreateGameResponse } from '../../client/src/common/socket_messages/CreateGame';
import { JoinGameRequest, JoinGameResponse } from '../../client/src/common/socket_messages/JoinGame';
import { GetCardPiocheRequest, GetCardPiocheResponse } from '../../client/src/common/socket_messages/GetCardPioche';
import { RemoveCardFromInventoryRequest, RemoveCardFromInventoryResponse } from '../../client/src/common/socket_messages/RemoveCardFromInventory';
import { LeaveGameRequest } from '../../client/src/common/socket_messages/LeaveGame';
import GameModelError from './motrigolo/GameModelError';

const application = express();

/** Server Handling */
const httpServer = http.createServer(application);

/** Start Socket */
new ServerSocket(httpServer);

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
    const socketId = req.query['socketId'] as string;
    const game = GameManager.instance.createGame(socketId);
    const chosenWords = game.chooseRandomWords((game.gridSize - 1) * 2);
    ServerSocket.instance.AddSocketToRoom(socketId, game.gameId);

    return res.status(200).json(new CreateGameResponse(game.gameId, game.gridSize, chosenWords));
});

application.get('/' + JoinGameRequest.Message, (req, res, next) => {
    const socketId = req.query['socketId'] as string;
    const gameId = req.query['gameId'] as string;
    ServerSocket.instance.AddSocketToRoom(socketId, gameId);
    const game = GameManager.instance.getGame(gameId);

    if (game instanceof GameModelError) {
        return res.status(404).json(game.message);
    }

    game.addPlayer(socketId);
    return res.status(200).json(new JoinGameResponse(gameId, game.gridSize, game.ChosenWords));
});

application.get('/' + GetCardPiocheRequest.Message, (req, res, next) => {
    const socketId = req.query['socketId'] as string;
    const gameId = req.query['gameId'] as string;
    const game = GameManager.instance.getGame(gameId);

    if (game instanceof GameModelError) {
        return res.status(404).json(game.message);
    }

    const cardPiochee = game.addCardToPlayerInventory(socketId);
    if (cardPiochee instanceof GameModelError) {
        return res.status(404).json(cardPiochee.message);
    }

    return res.status(200).json(new GetCardPiocheResponse(cardPiochee, game.piocheEmpty));
});

application.get('/' + RemoveCardFromInventoryRequest.Message, (req, res, next) => {
    const socketId = req.query['socketId'] as string;
    const gameId = req.query['gameId'] as string;
    const card = req.query['card'] as string;
    const game = GameManager.instance.getGame(gameId);

    if (game instanceof GameModelError) {
        return res.status(404).json(game.message);
    }

    game.removeCardFromPlayerInventory(socketId, card);

    return res.status(200).json(new RemoveCardFromInventoryResponse(card));
});

application.get('/' + LeaveGameRequest.Message, (req, res, next) => {
    const socketId = req.query['socketId'] as string;
    const gameId = req.query['gameId'] as string;

    GameManager.instance.removePlayerFromGame(gameId, socketId);
    ServerSocket.instance.RemoveSocketFromRoom(socketId, gameId);

    return res.status(200);
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
