import { CreateGameRequest, CreateGameResponse } from '../common/socket_messages/CreateGame';
import { LeaveGameRequest } from '../common/socket_messages/LeaveGame';
import { GetCardPiocheRequest, GetCardPiocheResponse } from '../common/socket_messages/GetCardPioche';
import { JoinGameRequest, JoinGameResponse } from '../common/socket_messages/JoinGame';
import { RemoveCardFromInventoryRequest, RemoveCardFromInventoryResponse } from '../common/socket_messages/RemoveCardFromInventory';
import { CheckGameExistsRequest } from '../common/socket_messages/GameExistsCheck';
import { FlipOverCardRequest } from '../common/socket_messages/FlipOverCard';
import { SynchronizeGameValuesRequest, SynchronizeGameValuesResponse } from '../common/socket_messages/SynchronizeGameValues';
import { ModifyWordRequest } from '../common/socket_messages/ModifyWord';

export class MotRigoloGameContextHttpClient {
    private gameId: string;
    private playerId: string;

    constructor(gameId: string, playerId: string) {
        this.gameId = gameId;
        this.playerId = playerId;
    }

    LeaveGame = async (): Promise<HttpResult> => {
        return await MotRigoloClient.Call(`${LeaveGameRequest.Message}?socketId=${this.playerId}&gameId=${this.gameId}`);
    };

    SynchronizeGameValues = async (): Promise<HttpResultValue<SynchronizeGameValuesResponse>> => {
        return await MotRigoloClient.CallWithResponseValue<SynchronizeGameValuesResponse>(
            `${SynchronizeGameValuesRequest.Message}?gameId=${this.gameId}`
        );
    };

    GetCardPioche = async (): Promise<HttpResultValue<GetCardPiocheResponse>> => {
        return await MotRigoloClient.CallWithResponseValue<GetCardPiocheResponse>(
            `${GetCardPiocheRequest.Message}?socketId=${this.playerId}&gameId=${this.gameId}`
        );
    };

    RemoveCardInventory = async (card: string): Promise<HttpResultValue<RemoveCardFromInventoryResponse>> => {
        return await MotRigoloClient.CallWithResponseValue<RemoveCardFromInventoryResponse>(
            `${RemoveCardFromInventoryRequest.Message}?socketId=${this.playerId}&gameId=${this.gameId}&card=${card}`
        );
    };

    FlipOverCard = async (cardIndex: string): Promise<HttpResult> => {
        return await MotRigoloClient.Call(`${FlipOverCardRequest.Message}?cardIndex=${cardIndex}&gameId=${this.gameId}`);
    };

    ModifyWord = async (word: string): Promise<HttpResult> => {
        return await MotRigoloClient.Call(`${ModifyWordRequest.Message}?gameId=${this.gameId}&word=${word}`);
    };
}

export class MotRigoloSocketContextHttpClient {
    private playerId: string;

    constructor(playerId: string) {
        this.playerId = playerId;
    }

    CreateGame = async (): Promise<HttpResultValue<CreateGameResponse>> => {
        console.log(this.playerId);
        return await MotRigoloClient.CallWithResponseValue<CreateGameResponse>(`${CreateGameRequest.Message}?socketId=${this.playerId}`);
    };

    JoinGame = async (gameId: string): Promise<HttpResultValue<JoinGameResponse>> => {
        return await MotRigoloClient.CallWithResponseValue<JoinGameResponse>(`${JoinGameRequest.Message}?socketId=${this.playerId}&gameId=${gameId}`);
    };
}

export class MotRigoloClient {
    private static baseUrl = 'http://localhost:1337';

    static CheckGameExists = async (gameId: string): Promise<HttpResult> => {
        return await MotRigoloClient.Call(`${CheckGameExistsRequest.Message}?gameId=${gameId}`);
    };

    static async Call(url: string): Promise<HttpResult> {
        try {
            var response = await fetch(`${MotRigoloClient.baseUrl}/${url}`);
            if (response.ok) {
                return {
                    success: true
                };
            }

            const result: string = await response.json();
            return {
                success: false,
                errorMessage: result
            };
        } catch (error) {
            return {
                success: false,
                errorMessage: 'Un problème est survenu lors du call HTTP'
            };
        }
    }

    static async CallWithResponseValue<T>(url: string): Promise<HttpResultValue<T>> {
        try {
            var response = await fetch(`${MotRigoloClient.baseUrl}/${url}`);
            if (!response.ok) {
                const result: string = await response.json();
                return {
                    success: false,
                    errorMessage: result
                };
            }

            const result: T = await response.json();
            return {
                success: true,
                value: result
            };
        } catch (error) {
            return {
                success: false,
                errorMessage: 'Un problème est survenu lors du call HTTP'
            };
        }
    }
}

export type HttpResult = HttpError | HttpResultBasic;

export type HttpResultValue<T> = HttpError | HttpResultWithValue<T>;

export type HttpError = {
    success: false;
    errorMessage: string;
};

export type HttpResultWithValue<T> = {
    value: T;
} & HttpResultBasic;

export type HttpResultBasic = {
    success: true;
};
