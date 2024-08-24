import { useContext, useEffect } from 'react';
import { defaultGameId, GameContext } from '../../../contexts/GameContext';
import { Box, Stack } from '@mui/material';
import CardsInventory from '../Cards/CardsInventory/CardsInventory';
import CardPioche from '../Cards/CardPioche/CardPioche';
import GameGrid from '../GameGrid/GameGrid';
import GameLobbyHeader from './GameLobbyHeader';
import GameSettings from '../../../Settings/GameSettings';
import { AlertContext } from '../../../contexts/AlertContext';
import SocketContext from '../../../contexts/SocketContext';

const gameSettings = new GameSettings();

type GameLobbyComponentsProps = {
    gameId: string;
};

const GameLobbyComponents = (props: GameLobbyComponentsProps) => {
    const alertContext = useContext(AlertContext);
    const { getClient: socketClient } = useContext(SocketContext);
    const { gameId, gridSize, getClient, setGridSize, setChosenWords, setGameId, setGridCardsStates, setPiocheEmpty } = useContext(GameContext);

    useEffect(() => {
        const joinGame = async () => {
            const result = await socketClient().JoinGame(props.gameId);

            if (!result.success) {
                alertContext?.setAlertMessage('Impossible de join la partie');
                return;
            }

            setGridSize(result.value.gridSize);
            setChosenWords(result.value.chosenWords);
        };

        if (props.gameId === undefined) {
            alertContext?.setAlertMessage('Impossible de set les valeurs du game context');
            return;
        }

        setGameId(props.gameId);
        joinGame();
    }, []);

    useEffect(() => {
        const synchronizeGameValues = async () => {
            const result = await getClient().SynchronizeGameValues();
            if (!result.success) {
                alertContext?.setAlertMessage(result.errorMessage);
                return;
            }

            setGridCardsStates(result.value.gridCards);
            setPiocheEmpty(result.value.piocheEmpty);
        };

        if (gameId !== defaultGameId) {
            synchronizeGameValues();
        }
    }, [gameId]);

    return (
        <Box
            display="flex"
            sx={{
                backgroundImage: 'url(/images/pages/gameLobbyBackgound.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: `${gameSettings.getRandomCursor()}, auto`
            }}
        >
            <Stack
                direction="column"
                sx={{
                    justifyItems: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                }}
            >
                <GameLobbyHeader />
                <Stack
                    direction="row"
                    sx={{
                        justifyItems: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Stack
                        direction="column"
                        sx={{
                            height: '100%',
                            width: '20%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <CardsInventory></CardsInventory>
                    </Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            width: '60%',
                            justifyContent: 'center'
                        }}
                    >
                        <GameGrid gridSize={gridSize} />
                    </Box>

                    <Box
                        sx={{
                            height: '100%',
                            width: '20%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex'
                        }}
                    >
                        <CardPioche></CardPioche>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default GameLobbyComponents;
