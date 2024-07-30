import { useLocation } from 'react-router-dom';
import { GameProvider } from '../../../contexts/GameContext';
import GameLobbyComponents from './GameLobbyComponents';

const GameLobby = () => {
    const location = useLocation();
    const { gridSize, gameId } = location.state || {};

    return (
        <GameProvider>
            <GameLobbyComponents gridSize={gridSize} gameId={gameId}></GameLobbyComponents>
        </GameProvider>
    );
};

export default GameLobby;
