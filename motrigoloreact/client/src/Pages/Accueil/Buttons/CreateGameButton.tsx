import { useNavigate } from 'react-router-dom';
import MenuButton from '../../Shared/MenuButton';
import { MotRigoloClient } from '../../../HttpClient/MotRigoloClient';
import SocketContext from '../../../contexts/SocketContext';
import { useContext } from 'react';
import { GameContext } from '../../../contexts/GameContext';

const CreateGameButton = () => {
    const background = 'url(/images/buttons/menuButton1.png)';

    const { SocketState } = useContext(SocketContext);
    const navigate = useNavigate();

    const handleCreateGame = async () => {
        var result = await MotRigoloClient.CreateGame(SocketState.uid);
        if (result.isValid) {
            navigate(`/game/${result.value?.gameId}`, { state: { gridSize: result.value?.gridSize, gameId: result.value?.gameId } });
        }
    };

    return <MenuButton onClick={handleCreateGame} text="Create game" buttonWidth="100%" textSize="h4" background={background}></MenuButton>;
};

export default CreateGameButton;
