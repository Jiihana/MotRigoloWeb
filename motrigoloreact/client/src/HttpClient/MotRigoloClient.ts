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

    LeaveGame = (): Promise<HttpResult> => {
        return this.CallGameContext(LeaveGameRequest.Message);
    };

    SynchronizeGameValues = (): Promise<HttpResultValue<SynchronizeGameValuesResponse>> => {
        return this.CallGameContextWithValue(SynchronizeGameValuesRequest.Message);
    };

    GetCardPioche = (): Promise<HttpResultValue<GetCardPiocheResponse>> => {
        return this.CallGameContextWithValue(GetCardPiocheRequest.Message);
    };

    RemoveCardInventory = (card: string): Promise<HttpResultValue<RemoveCardFromInventoryResponse>> => {
        return this.CallGameContextWithValue(`${RemoveCardFromInventoryRequest.Message}?card=${card}`);
    };

    FlipOverCard = (cardIndex: string): Promise<HttpResult> => {
        return this.CallGameContext(`${FlipOverCardRequest.Message}?cardIndex=${cardIndex}`);
    };

    ModifyWord = (word: string): Promise<HttpResult> => {
        return this.CallGameContext(`${ModifyWordRequest.Message}?word=${word}`);
    };

    private CallGameContextWithValue = <T>(url: string): Promise<HttpResultValue<T>> => {
        return MotRigoloClient.CallWithResponseValue<T>(url, {
            gameId: this.gameId,
            playerId: this.playerId
        });
    };

    private CallGameContext = (url: string): Promise<HttpResult> => {
        return MotRigoloClient.Call(url, {
            gameId: this.gameId,
            playerId: this.playerId
        });
    };
}

export class MotRigoloSocketContextHttpClient {
    private playerId: string;

    constructor(playerId: string) {
        this.playerId = playerId;
    }

    CreateGame = async (): Promise<HttpResultValue<CreateGameResponse>> => {
        return MotRigoloClient.CallWithResponseValue(CreateGameRequest.Message, {
            playerId: this.playerId
        });
    };

    JoinGame = async (gameId: string): Promise<HttpResultValue<JoinGameResponse>> => {
        return MotRigoloClient.CallWithResponseValue(JoinGameRequest.Message, {
            gameId: gameId,
            playerId: this.playerId
        });
    };
}

export class MotRigoloClient {
    private static baseUrl = 'http://192.168.1.10:32768';

    static CheckGameExists = async (gameId: string): Promise<HttpResult> => {
        return await MotRigoloClient.Call(`${CheckGameExistsRequest.Message}?gameId=${gameId}`);
    };

    static async Call(url: string, headers: Record<string, string> = {}): Promise<HttpResult> {
        try {
            var response = await fetch(`${MotRigoloClient.baseUrl}/${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            });

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

    static async CallWithResponseValue<T>(url: string, headers: Record<string, string> = {}): Promise<HttpResultValue<T>> {
        try {
            var response = await fetch(`${MotRigoloClient.baseUrl}/${url}`, {
                method: 'GET',
                headers: {
                    ...headers
                }
            });

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

type HttpError = {
    success: false;
    errorMessage: string;
};

type HttpResultWithValue<T> = {
    value: T;
} & HttpResultBasic;

type HttpResultBasic = {
    success: true;
};
