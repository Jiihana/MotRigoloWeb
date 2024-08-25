import { CreateGameRequest, CreateGameResponse } from '../../../client/src/common/socket_messages/CreateGame';
import { FlipOverCardRequest } from '../../../client/src/common/socket_messages/FlipOverCard';
import { CheckGameExistsRequest } from '../../../client/src/common/socket_messages/GameExistsCheck';
import { GetCardPiocheRequest, GetCardPiocheResponse } from '../../../client/src/common/socket_messages/GetCardPioche';
import { JoinGameRequest, JoinGameResponse } from '../../../client/src/common/socket_messages/JoinGame';
import { LeaveGameRequest } from '../../../client/src/common/socket_messages/LeaveGame';
import { ModifyWordRequest } from '../../../client/src/common/socket_messages/ModifyWord';
import { RemoveCardFromInventoryRequest, RemoveCardFromInventoryResponse } from '../../../client/src/common/socket_messages/RemoveCardFromInventory';
import { SynchronizeGameValuesRequest, SynchronizeGameValuesResponse } from '../../../client/src/common/socket_messages/SynchronizeGameValues';
import { ServerSocket } from '../serverSocket';
import { GameManager } from './GameManager';
import * as core from 'express-serve-static-core';
import { cannotFlipOverCard, cannotSynchronizeGameValues, ResultatValue } from './GameModelError';
import GameModel from './models/GameModel';

export class serverApiMotRigolo {
    static registerEndpoint = (application: core.Express) => {
        application.get('/' + CheckGameExistsRequest.Message, (req, res) => {
            const gameResult = getGame(req);
            if (!gameResult.success) {
                return res.status(404).send(gameResult.message);
            }

            return res.status(200).send();
        });

        application.get('/' + CreateGameRequest.Message, async (req, res) => {
            const playerResult = getPlayerId(req);
            if (!playerResult.success) {
                return res.status(401).send(playerResult.message);
            }

            const game = await GameManager.instance.createGame(playerResult.value);
            if (!game.success) {
                return res.status(500).json(game.message);
            }

            ServerSocket.instance.AddSocketToRoom(playerResult.value, game.value.gameId);

            return res.status(200).json(new CreateGameResponse(game.value.gameId, game.value.gridSize, game.value.ChosenWords));
        });

        application.get('/' + JoinGameRequest.Message, (req, res) => {
            const playerResult = getPlayerId(req);
            if (!playerResult.success) {
                return res.status(401).json(playerResult.message);
            }

            const gameResult = getGame(req);
            if (!gameResult.success) {
                return res.status(404).send(gameResult.message);
            }

            ServerSocket.instance.AddSocketToRoom(playerResult.value, gameResult.value.gameId);

            var newPlayer = gameResult.value.addPlayer(playerResult.value);

            return res
                .status(200)
                .json(new JoinGameResponse(gameResult.value.gameId, gameResult.value.gridSize, gameResult.value.ChosenWords, newPlayer.cursorPath));
        });

        application.get('/' + GetCardPiocheRequest.Message, (req, res) => {
            const playerResult = getPlayerId(req);
            if (!playerResult.success) {
                return res.status(401).json(playerResult.message);
            }

            const gameResult = getGame(req);
            if (!gameResult.success) {
                return res.status(404).send(gameResult.message);
            }

            const cardPiochee = gameResult.value.addCardToPlayerInventory(playerResult.value);
            if (!cardPiochee.success) {
                return res.status(404).json(cardPiochee.message);
            }

            return res.status(200).json(new GetCardPiocheResponse(cardPiochee.value, gameResult.value.piocheEmpty));
        });

        application.get('/' + RemoveCardFromInventoryRequest.Message, (req, res) => {
            const playerResult = getPlayerId(req);
            if (!playerResult.success) {
                return res.status(401).json(playerResult.message);
            }

            const gameResult = getGame(req);
            if (!gameResult.success) {
                return res.status(404).send(gameResult.message);
            }

            const card = req.query['card'] as string;
            gameResult.value.removeCardFromPlayerInventory(playerResult.value, card);

            return res.status(200).json(new RemoveCardFromInventoryResponse(card));
        });

        application.get('/' + LeaveGameRequest.Message, (req, res) => {
            const playerResult = getPlayerId(req);
            if (!playerResult.success) {
                return res.status(401).json(playerResult.message);
            }

            const gameResult = getGame(req);
            if (!gameResult.success) {
                return res.status(404).send(gameResult.message);
            }

            GameManager.instance.removePlayerFromGame(playerResult.value);
            ServerSocket.instance.RemoveSocketFromRoom(playerResult.value, gameResult.value.gameId);

            return res.status(200).send();
        });

        application.get('/' + FlipOverCardRequest.Message, (req, res) => {
            const gameResult = getGame(req);
            if (!gameResult.success) {
                return res.status(404).send(gameResult.message);
            }

            const cardIndex = req.query['cardIndex'] as string;

            const flipOverResult = ServerSocket.instance.FlipOverCard(gameResult.value, cardIndex);
            if (!flipOverResult.success) {
                return res.status(400).json(`${flipOverResult.message}. ${cannotFlipOverCard}`);
            }

            return res.status(200).send();
        });

        application.get('/' + SynchronizeGameValuesRequest.Message, (req, res) => {
            const gameResult = getGame(req);
            if (!gameResult.success) {
                return res.status(404).send(gameResult.message);
            }

            const gridCardsState = gameResult.value.SynchronizeCards();
            const gridCardsObject = Object.fromEntries(gridCardsState.entries());
            return res.status(200).json(new SynchronizeGameValuesResponse(gridCardsObject, gameResult.value.piocheEmpty));
        });

        application.get('/' + ModifyWordRequest.Message, async (req, res) => {
            const gameResult = getGame(req);
            if (!gameResult.success) {
                return res.status(404).send(gameResult.message);
            }

            const word = req.query['word'] as string;

            const response = await ServerSocket.instance.ModifyWord(gameResult.value, word);
            if (!response.success) {
                return res.status(500).json(response.message);
            }

            return res.status(200).send();
        });
    };
}

const getGame = (request: core.Request): ResultatValue<GameModel> => {
    const gameIdResult = getGameId(request);
    if (!gameIdResult.success) {
        return gameIdResult;
    }

    const gameResult = GameManager.instance.getGame(gameIdResult.value);
    return gameResult;
};

const getGameId = (request: core.Request): ResultatValue<string> => {
    const gameIdHeader = request.header('gameId');
    if (gameIdHeader === undefined) {
        return {
            success: false,
            message: 'gameId header was undefined'
        };
    }

    return {
        success: true,
        value: gameIdHeader
    };
};

const getPlayerId = (request: core.Request): ResultatValue<string> => {
    const playerIdHeader = request.header('playerId');
    if (playerIdHeader === undefined) {
        return {
            success: false,
            message: 'playerId header was undefined'
        };
    }

    return {
        success: true,
        value: playerIdHeader
    };
};
