import http from 'http';
import express from 'express';
import { ServerSocket } from './serverSocket';
import { CheckGameExistsRequest } from '../../client/src/common/socket_messages/GameExistsCheck';
import { GameManager } from './motrigolo/GameManager';
import { CreateGameRequest, CreateGameResponse } from '../../client/src/common/socket_messages/CreateGame';
import { JoinGameRequest, JoinGameResponse } from '../../client/src/common/socket_messages/JoinGame';
import { GetCardPiocheRequest, GetCardPiocheResponse } from '../../client/src/common/socket_messages/GetCardPioche';
import { RemoveCardFromInventoryRequest, RemoveCardFromInventoryResponse } from '../../client/src/common/socket_messages/RemoveCardFromInventory';
import { LeaveGameRequest } from '../../client/src/common/socket_messages/LeaveGame';
import { FlipOverCardRequest } from '../../client/src/common/socket_messages/FlipOverCard';
import { SynchronizeGameValuesRequest, SynchronizeGameValuesResponse } from '../../client/src/common/socket_messages/SynchronizeGameValues';
import { cannotFlipOverCard, cannotSynchronizeGameValues } from './motrigolo/GameModelError';
import { ModifyWordRequest, ModifyWordResponse } from '../../client/src/common/socket_messages/ModifyWord';
import { UpdateCursorRequest } from '../../client/src/common/socket_messages/UpdateCursor';

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
    const response = GameManager.instance.gameExists(req.query['gameId'] as string);
    if (!response) {
        return res.status(404).send();
    }

    return res.status(200).send();
});

application.get('/' + CreateGameRequest.Message, async (req, res, next) => {
    const socketId = req.query['socketId'] as string;
    const cursorX = req.query['cursorX'] as string;
    const cursorY = req.query['cursorY'] as string;

    const game = await GameManager.instance.createGame(socketId, +cursorX, +cursorY);

    if (!game.success) {
        return res.status(500).json(game.message);
    }

    ServerSocket.instance.AddSocketToRoom(socketId, game.value.gameId);

    return res.status(200).json(new CreateGameResponse(game.value.gameId, game.value.gridSize, game.value.ChosenWords));
});

application.get('/' + JoinGameRequest.Message, (req, res, next) => {
    const socketId = req.query['socketId'] as string;
    const gameId = req.query['gameId'] as string;
    const cursorX = req.query['cursorX'] as string;
    const cursorY = req.query['cursorY'] as string;
    ServerSocket.instance.AddSocketToRoom(socketId, gameId);
    const game = GameManager.instance.getGame(gameId);

    if (!game.success) {
        return res.status(404).json(game.message);
    }

    game.value.addPlayer(socketId, +cursorX, +cursorY);
    return res.status(200).json(new JoinGameResponse(gameId, game.value.gridSize, game.value.ChosenWords));
});

application.get('/' + GetCardPiocheRequest.Message, (req, res, next) => {
    const socketId = req.query['socketId'] as string;
    const gameId = req.query['gameId'] as string;
    const game = GameManager.instance.getGame(gameId);

    if (!game.success) {
        return res.status(404).json(game.message);
    }

    const cardPiochee = game.value.addCardToPlayerInventory(socketId);
    if (!cardPiochee.success) {
        return res.status(404).json(cardPiochee.message);
    }

    return res.status(200).json(new GetCardPiocheResponse(cardPiochee.value, game.value.piocheEmpty));
});

application.get('/' + RemoveCardFromInventoryRequest.Message, (req, res, next) => {
    const socketId = req.query['socketId'] as string;
    const gameId = req.query['gameId'] as string;
    const card = req.query['card'] as string;
    const game = GameManager.instance.getGame(gameId);

    if (!game.success) {
        return res.status(404).json(game.message);
    }

    game.value.removeCardFromPlayerInventory(socketId, card);

    return res.status(200).json(new RemoveCardFromInventoryResponse(card));
});

application.get('/' + LeaveGameRequest.Message, (req, res, next) => {
    const socketId = req.query['socketId'] as string;
    const gameId = req.query['gameId'] as string;

    GameManager.instance.removePlayerFromGame(socketId);
    ServerSocket.instance.RemoveSocketFromRoom(socketId, gameId);

    return res.status(200).send();
});

application.get('/' + FlipOverCardRequest.Message, (req, res, next) => {
    const cardIndex = req.query['cardIndex'] as string;
    const gameId = req.query['gameId'] as string;

    const game = GameManager.instance.getGame(gameId);

    if (!game.success) {
        return res.status(404).json(`${game.message}. ${cannotFlipOverCard}`);
    }

    const flipOverResult = ServerSocket.instance.FlipOverCard(game.value, cardIndex);

    if (!flipOverResult.success) {
        return res.status(400).json(`${flipOverResult.message}. ${cannotFlipOverCard}`);
    }

    return res.status(200).send();
});

application.get('/' + SynchronizeGameValuesRequest.Message, (req, res, next) => {
    const gameId = req.query['gameId'] as string;

    const game = GameManager.instance.getGame(gameId);
    if (!game.success) {
        return res.status(404).json(`${game.message}. ${cannotSynchronizeGameValues}`);
    }

    const gridCardsState = game.value.SynchronizeCards();
    const gridCardsObject = Object.fromEntries(gridCardsState.entries());
    return res.status(200).json(new SynchronizeGameValuesResponse(gridCardsObject, game.value.piocheEmpty));
});

application.get('/' + ModifyWordRequest.Message, async (req, res, next) => {
    const gameId = req.query['gameId'] as string;
    const word = req.query['word'] as string;

    const game = GameManager.instance.getGame(gameId);
    if (!game.success) {
        return res.status(404).json(`${game.message}. ${cannotSynchronizeGameValues}`);
    }

    const response = await ServerSocket.instance.ModifyWord(game.value, word);

    if (!response.success) {
        return res.status(500).json(response.message);
    }

    return res.status(200).send();
});

application.get('/' + UpdateCursorRequest.Message, async (req, res, next) => {
    const socketId = req.query['socketId'] as string;
    const gameId = req.query['gameId'] as string;
    const cursorX = req.query['cursorX'] as string;
    const cursorY = req.query['cursorY'] as string;

    const game = GameManager.instance.getGame(gameId);
    if (!game.success) {
        return res.status(404).json(`${game.message}. Impossible de synchroniser le curseur`);
    }

    await ServerSocket.instance.UpdateCursorPosition(socketId, game.value, +cursorX, +cursorY);
    return res.status(200).send();
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
