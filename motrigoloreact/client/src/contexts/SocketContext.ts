import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { MotRigoloSocketContextHttpClient } from '../HttpClient/MotRigoloClient';

export interface ISocketContextState {
    socket: Socket | undefined;
    uid: string;
    users: string[];
}

export const defaultSocketContextState: ISocketContextState = {
    socket: undefined,
    uid: '',
    users: []
};

export type TSocketContextActions = 'update_socket' | 'update_uid' | 'update_users' | 'remove_user';
export type TSocketContextPayload = string | string[] | Socket;

export interface ISocketContextActions {
    type: TSocketContextActions;
    payload: TSocketContextPayload;
}

export const SocketReducer = (state: ISocketContextState, action: ISocketContextActions) => {
    switch (action.type) {
        case 'update_socket':
            return { ...state, socket: action.payload as Socket };
        case 'update_uid':
            return { ...state, uid: action.payload as string };
        case 'update_users':
            return { ...state, users: action.payload as string[] };
        case 'remove_user':
            return { ...state, users: state.users.filter((uid) => uid !== (action.payload as string)) };
        default:
            return state;
    }
};

export interface ISocketContextProps {
    SocketState: ISocketContextState;
    SocketDispatch: React.Dispatch<ISocketContextActions>;
    getClient(): MotRigoloSocketContextHttpClient;
}

const SocketContext = createContext<ISocketContextProps>({
    SocketState: defaultSocketContextState,
    SocketDispatch: () => {},
    getClient() {
        return new MotRigoloSocketContextHttpClient('');
    }
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
