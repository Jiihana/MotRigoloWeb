import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';
import SocketContext from '../../../../contexts/SocketContext';
import { GetCardPiocheRequest } from '../../../../common/socket_messages/GetCardPioche';

const CardPioche = () => {
    const background = 'url(/images/cards/cardIndexBack.png)';

    const { socket } = useContext(SocketContext).SocketState;

    const getCardPioche = () => {
        console.log('^pioche');
        socket?.emit(GetCardPiocheRequest.Message);
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
