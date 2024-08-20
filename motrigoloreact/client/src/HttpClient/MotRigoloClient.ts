import { CreateGameRequest, CreateGameResponse } from '../common/socket_messages/CreateGame';
import { LeaveGameRequest } from '../common/socket_messages/LeaveGame';
import { GetCardPiocheRequest, GetCardPiocheResponse } from '../common/socket_messages/GetCardPioche';
import { JoinGameRequest, JoinGameResponse } from '../common/socket_messages/JoinGame';
import { RemoveCardFromInventoryRequest, RemoveCardFromInventoryResponse } from '../common/socket_messages/RemoveCardFromInventory';

export class MotRigoloClient {
    private static baseUrl = 'http://localhost:1337';

    static CreateGame = async (socketId: string): Promise<HttpResult<CreateGameResponse>> => {
        try {
            const response = await fetch(`${MotRigoloClient.baseUrl}/${CreateGameRequest.Message}?socketId=${socketId}`);
            const result: CreateGameResponse = await response.json();
            return {
                isValid: true,
                value: result
            };
        } catch (error) {
            return {
                value: undefined,
                isValid: false
            };
        }
    };

    static JoinGame = async (socketId: string, gameId: string): Promise<HttpResult<JoinGameResponse>> => {
        try {
            const response = await fetch(`${MotRigoloClient.baseUrl}/${JoinGameRequest.Message}?socketId=${socketId}&gameId=${gameId}`);
            const result: JoinGameResponse = await response.json();
            return {
                isValid: true,
                value: result
            };
        } catch (error) {
            return {
                value: undefined,
                isValid: false
            };
        }
    };

    static GetCardPioche = async (socketId: string, gameId: string): Promise<HttpResult<GetCardPiocheResponse>> => {
        console.log(`game id dans la requete GetCardPioche ${gameId}`);
        try {
            const response = await fetch(`${MotRigoloClient.baseUrl}/${GetCardPiocheRequest.Message}?socketId=${socketId}&gameId=${gameId}`);
            const result: GetCardPiocheResponse = await response.json();
            return {
                isValid: true,
                value: result
            };
        } catch (error) {
            return {
                value: undefined,
                isValid: false
            };
        }
    };

    static RemoveCardInventory = async (socketId: string, gameId: string, card: string): Promise<HttpResult<RemoveCardFromInventoryResponse>> => {
        try {
            const response = await fetch(
                `${MotRigoloClient.baseUrl}/${RemoveCardFromInventoryRequest.Message}?socketId=${socketId}&gameId=${gameId}&card=${card}`
            );
            const result: RemoveCardFromInventoryResponse = await response.json();
            return {
                isValid: true,
                value: result
            };
        } catch (error) {
            return {
                value: undefined,
                isValid: false
            };
        }
    };

    static LeaveGame = async (socketId: string, gameId: string): Promise<HttpResultBasic> => {
        try {
            await fetch(`${MotRigoloClient.baseUrl}/${LeaveGameRequest.Message}?socketId=${socketId}&gameId=${gameId}`);
            return {
                isValid: true
            };
        } catch (error) {
            return {
                isValid: false
            };
        }
    };
}

export type HttpResult<T> = {
    value: undefined | T;
    isValid: boolean;
};

export type HttpResultBasic = {
    isValid: boolean;
};
