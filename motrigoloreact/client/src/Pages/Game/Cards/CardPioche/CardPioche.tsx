import React from 'react';
import { Box, colors } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';

const CardPioche = () => {
    const background = 'url(/images/cards/cardIndexBack.png)';

    return (
        <Box
            sx={{
                height: '20%',
                width: '45%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
            }}
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
