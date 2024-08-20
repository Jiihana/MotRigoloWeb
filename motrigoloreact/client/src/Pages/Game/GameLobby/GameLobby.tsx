import { useLocation } from 'react-router-dom';
import { GameProvider } from '../../../contexts/GameContext';
import GameLobbyComponents from './GameLobbyComponents';
import { useContext, useEffect } from 'react';
import SocketContext from '../../../contexts/SocketContext';
import { SynchronizeGameValuesRequest } from '../../../common/socket_messages/SynchronizeGameValues';

const GameLobby = () => {
    const location = useLocation();
    const { gridSize, gameId } = location.state || {};
    const { socket } = useContext(SocketContext).SocketState;

    useEffect(() => {
        socket?.emit(SynchronizeGameValuesRequest.Message, new SynchronizeGameValuesRequest());
        console.log(gameId);
    }, []);

    return (
        <GameProvider>
            <GameLobbyComponents gridSize={gridSize} gameId={gameId}></GameLobbyComponents>
        </GameProvider>
    );
};

export default GameLobby;
