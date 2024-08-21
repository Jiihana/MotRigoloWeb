import { useContext } from 'react';
import { Box } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';
import SocketContext from '../../../../contexts/SocketContext';
import { MotRigoloClient } from '../../../../HttpClient/MotRigoloClient';
import { GameContext } from '../../../../contexts/GameContext';

const CardPioche = () => {
    const background = 'url(/images/cards/cardIndexBack.png)';

    const { SocketState } = useContext(SocketContext);
    const gameContext = useContext(GameContext);

    const getCardPioche = async () => {
        console.log(gameContext);
        var result = await MotRigoloClient.GetCardPioche(SocketState.socket?.id!, gameContext?.gameId as string);

        if (result.value?.cardPioche == '') {
            console.log('Carte reçue de la pioche stringEmpty');
            return;
        }
        if (result.isValid) {
            const card = result.value?.cardPioche as string;
            gameContext?.setCardsInventory((prevCards) => [...prevCards, card]);
        }
    };

    return (
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
            ></CardWithText>
        </Box>
    );
};
export default CardPioche;
