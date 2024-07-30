import { CreateGameRequest, CreateGameResponse } from '../common/socket_messages/CreateGame';
import { GetCardPiocheRequest, GetCardPiocheResponse } from '../common/socket_messages/GetCardPioche';
import { JoinGameRequest, JoinGameResponse } from '../common/socket_messages/JoinGame';

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
}

export type HttpResult<T> = {
    value: undefined | T;
    isValid: boolean;
};
