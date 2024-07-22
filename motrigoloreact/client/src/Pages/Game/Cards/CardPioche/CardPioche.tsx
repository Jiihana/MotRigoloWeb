import React, { useState } from 'react';
import CardWithTextIndex from '../CardWithText/CardWithTextIndex';
import { Box } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';

const CardPioche = () => {
    const background = '/images/cardIndexBack.png';

    return (
        <Box sx={{ height: '8%', width: '8%', marginRight: '-20%', marginLeft: '10%' }}>
            <CardWithText cardText="Pioche" backgroundImage={background} height="100%" width="100%" cardTextSize="h3"></CardWithText>
        </Box>
    );
};
export default CardPioche;
