import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';
import SocketContext from '../../../../contexts/SocketContext';
import { MotRigoloClient, HttpError } from '../../../../HttpClient/MotRigoloClient';
import { GameContext } from '../../../../contexts/GameContext';
import { SynchronizeGameValuesResponse } from '../../../../common/socket_messages/SynchronizeGameValues';
import { AlertContext } from '../../../../contexts/AlertContext';

const CardPioche = () => {
    const background = 'url(/images/cards/cardIndexBack.png)';

    const { SocketState } = useContext(SocketContext);
    const { socket } = useContext(SocketContext).SocketState;
    const gameContext = useContext(GameContext);
    const alertContext = useContext(AlertContext);

    const [piocheEmpty, setPiocheEmpty] = useState<boolean>(false);

    const getCardPioche = async () => {
        var result = await MotRigoloClient.GetCardPioche(SocketState.socket?.id!, gameContext?.gameId as string);

        if (result.success == false) {
            alertContext?.setAlertMessage(result.errorMessage);
            return;
        }

        if (result.value.cardPioche == '') {
            console.log('Carte reçue de la pioche stringEmpty');
            return;
        }

        const card = result.value?.cardPioche as string;
        gameContext?.setCardsInventory((prevCards) => [...prevCards, card]);
        setPiocheEmpty(result.value?.piocheEmpty as boolean);
        console.log(piocheEmpty);
    };

    useEffect(() => {
        socket?.on(SynchronizeGameValuesResponse.Message, (args: SynchronizeGameValuesResponse) => {
            console.log(`synchronize game response recue, valeur de la pioche ${args.piocheEmpty}`);

            setPiocheEmpty(args.piocheEmpty);
        });
    }, []);

    return (
        <>
            {!piocheEmpty && (
                <Box
                    sx={{
                        height: '20%',
                        width: '45%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex'
                    }}
                    onClick={getCardPioche}
                >
                    <CardWithText
                        cardText={'Pioche'}
                        backgroundImage={background}
                        height={'100%'}
                        width={'100%'}
                        textVariant={'h4'}
                        textShouldRotate={false}
                    />
                </Box>
            )}
        </>
    );
};
export default CardPioche;
