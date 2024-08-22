import { CreateGameRequest, CreateGameResponse } from '../common/socket_messages/CreateGame';
import { LeaveGameRequest } from '../common/socket_messages/LeaveGame';
import { GetCardPiocheRequest, GetCardPiocheResponse } from '../common/socket_messages/GetCardPioche';
import { JoinGameRequest, JoinGameResponse } from '../common/socket_messages/JoinGame';
import { RemoveCardFromInventoryRequest, RemoveCardFromInventoryResponse } from '../common/socket_messages/RemoveCardFromInventory';

export class MotRigoloClient {
    private static baseUrl = 'http://localhost:1337';

    static CreateGame = async (socketId: string): Promise<HttpResultValue<CreateGameResponse>> => {
        return await MotRigoloClient.CallWithResponseValue<CreateGameResponse>(
            `${MotRigoloClient.baseUrl}/${CreateGameRequest.Message}?socketId=${socketId}`
        );
    };

    static JoinGame = async (socketId: string, gameId: string): Promise<HttpResultValue<JoinGameResponse>> => {
        return await MotRigoloClient.CallWithResponseValue<JoinGameResponse>(
            `${MotRigoloClient.baseUrl}/${JoinGameRequest.Message}?socketId=${socketId}&gameId=${gameId}`
        );
    };

    static GetCardPioche = async (socketId: string, gameId: string): Promise<HttpResultValue<GetCardPiocheResponse>> => {
        return await MotRigoloClient.CallWithResponseValue<GetCardPiocheResponse>(
            `${MotRigoloClient.baseUrl}/${GetCardPiocheRequest.Message}?socketId=${socketId}&gameId=${gameId}`
        );
    };

    static RemoveCardInventory = async (
        socketId: string,
        gameId: string,
        card: string
    ): Promise<HttpResultValue<RemoveCardFromInventoryResponse>> => {
        return await MotRigoloClient.CallWithResponseValue<RemoveCardFromInventoryResponse>(
            `${MotRigoloClient.baseUrl}/${RemoveCardFromInventoryRequest.Message}?socketId=${socketId}&gameId=${gameId}&card=${card}`
        );
    };

    static LeaveGame = async (socketId: string, gameId: string): Promise<HttpResult> => {
        return await MotRigoloClient.Call(`${MotRigoloClient.baseUrl}/${LeaveGameRequest.Message}?socketId=${socketId}&gameId=${gameId}`);
    };

    static async Call(url: string): Promise<HttpResult> {
        try {
            var response = await fetch(url);
            if (!response.ok) {
                const result: string = await response.json();
                return {
                    state: 'error',
                    errorMessage: result
                };
            }

            return {
                state: 'ok'
            };
        } catch (error) {
            return {
                state: 'error',
                errorMessage: 'Un problème est survenu lors du call HTTP'
            };
        }
    }

    static async CallWithResponseValue<T>(url: string): Promise<HttpResultValue<T>> {
        try {
            var response = await fetch(url);
            if (!response.ok) {
                const result: string = await response.json();
                return {
                    state: 'error',
                    errorMessage: result
                };
            }

            const result: T = await response.json();
            return {
                state: 'ok',
                value: result
            };
        } catch (error) {
            return {
                state: 'error',
                errorMessage: 'Un problème est survenu lors du call HTTP'
            };
        }
    }
}

export type HttpResult = HttpError | HttpResultBasic;

export type HttpResultValue<T> = HttpError | HttpResultWithValue<T>;

export type HttpError = {
    state: 'error';
    errorMessage: string;
};

export type HttpResultWithValue<T> = {
    value: T;
} & HttpResultBasic;

export type HttpResultBasic = {
    state: 'ok';
};
