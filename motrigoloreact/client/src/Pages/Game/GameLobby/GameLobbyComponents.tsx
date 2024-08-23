import { useContext, useEffect } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import { Box, Stack } from '@mui/material';
import CardsInventory from '../Cards/CardsInventory/CardsInventory';
import CardPioche from '../Cards/CardPioche/CardPioche';
import GameGrid from '../GameGrid/GameGrid';
import GameLobbyHeader from './GameLobbyHeader';
import GameSettings from '../../../Settings/GameSettings';
import { MotRigoloClient } from '../../../HttpClient/MotRigoloClient';
import { AlertContext } from '../../../contexts/AlertContext';
import SocketContext from '../../../contexts/SocketContext';
import { useParams } from 'react-router-dom';

const gameSettings = new GameSettings();

type GameLobbyComponentsProps = {
    gameId: string;
};

const GameLobbyComponents = (props: GameLobbyComponentsProps) => {
    const gameContext = useContext(GameContext);
    const alertContext = useContext(AlertContext);
    const { socket } = useContext(SocketContext).SocketState;

    useEffect(() => {
        if (props.gameId == undefined) {
            alertContext?.setAlertMessage('Impossible de set les valeurs du game context');
            return;
        }

        const joinGame = async () => {
            const result = await MotRigoloClient.JoinGame(socket?.id as string, props.gameId);

            if (!result.success) {
                alertContext?.setAlertMessage('Impossible de join la partie');
                return;
            }

            gameContext.setGridSize(result.value.gridSize);
            gameContext.setChosenWords(result.value.chosenWords);
        };

        const synchronizeGameValues = async () => {
            const result = await MotRigoloClient.SynchronizeGameValues(props.gameId);
            if (!result.success) {
                alertContext?.setAlertMessage(result.errorMessage);
                return;
            }

            gameContext.setGridCardsStates(result.value.gridCards);
            gameContext.setPiocheEmpty(result.value.piocheEmpty);
        };

        gameContext.setGameId(props.gameId);
        joinGame();

        synchronizeGameValues();
    }, []);

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
                        <GameGrid gridSize={gameContext?.gridSize as number} />
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
