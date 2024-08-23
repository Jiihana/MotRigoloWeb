import { useNavigate } from 'react-router-dom';
import MenuButton from '../../Shared/MenuButton';
import { MotRigoloClient } from '../../../HttpClient/MotRigoloClient';
import SocketContext from '../../../contexts/SocketContext';
import { useContext } from 'react';

const CreateGameButton = () => {
    const background = 'url(/images/buttons/menuButton1.png)';

    const { SocketState } = useContext(SocketContext);
    const navigate = useNavigate();

    const handleCreateGame = async () => {
        var result = await MotRigoloClient.CreateGame(SocketState.socket?.id as string);

        if (result.success == true) {
            navigate(`/game/${result.value?.gameId}`, {
                state: { gridSize: result.value?.gridSize, gameId: result.value?.gameId, chosenWords: result.value?.chosenWords }
            });
        }
    };

    return <MenuButton onClick={handleCreateGame} text="Create game" buttonWidth="100%" textSize="h4" background={background}></MenuButton>;
};

export default CreateGameButton;
