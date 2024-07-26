import React from 'react';
import { Box, colors } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';

const CardPioche = () => {
    const background = '/images/cardIndexBack.png';

    return (
        <Box sx={{ height: 'auto', width: '40%', backgroundColor: colors.green[500] }}>
            <CardWithText cardText="Pioche" backgroundImage={background} height="100%" width="auto" textVariant="h2"></CardWithText>
        </Box>
    );
};
export default CardPioche;
