import { useLocation } from 'react-router-dom';
import { GameProvider } from '../../../contexts/GameContext';
import GameLobbyComponents from './GameLobbyComponents';
import { useContext, useEffect } from 'react';
import SocketContext from '../../../contexts/SocketContext';
import { SynchronizeGameValuesRequest } from '../../../common/socket_messages/SynchronizeGameValues';

const GameLobby = () => {
    const location = useLocation();
    const { gridSize, gameId, chosenWords } = location.state || {};
    const { socket } = useContext(SocketContext).SocketState;

    useEffect(() => {
        socket?.emit(SynchronizeGameValuesRequest.Message, new SynchronizeGameValuesRequest());
    }, []);

    return (
        <GameProvider>
            <GameLobbyComponents gridSize={gridSize} gameId={gameId} chosenWords={chosenWords}></GameLobbyComponents>
        </GameProvider>
    );
};

export default GameLobby;
