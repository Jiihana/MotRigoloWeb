import { useNavigate } from 'react-router-dom';
import MenuButton from '../../Shared/MenuButton';
import SocketContext from '../../../contexts/SocketContext';
import { useContext } from 'react';

const CreateGameButton = () => {
    const background = 'url(/images/buttons/menuButton1.png)';
    const backgroundHover = 'url(/images/buttons/menuButton1_hover.png)';

    const { getClient } = useContext(SocketContext);

    const navigate = useNavigate();

    const handleCreateGame = async () => {
        var result = await getClient().CreateGame();
        if (result.success) {
            navigate(`/game/${result.value.gameId}`);
        }
    };

    return (
        <MenuButton
            onClick={handleCreateGame}
            text="Creer une game"
            textSize="h4"
            background={background}
            hoverBackground={backgroundHover}
            dynamicCursor={true}
            staticCursorImage={''}
        />
    );
};

export default CreateGameButton;
