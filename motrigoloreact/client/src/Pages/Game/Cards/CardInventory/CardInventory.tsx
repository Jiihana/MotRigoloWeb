import React, { useState } from 'react';
import CardWithTextIndex from '../CardWithText/CardWithTextIndex';
import { Box, Stack } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';
import CardIndexStatique from '../CardIndex/CardIndexStatique';

const CardInventory = () => {
    return (
        <Stack spacing={4} sx={{ height: '8%', width: '8%', marginRight: '15%', marginLeft: '-25%' }}>
            {/* <CardIndexStatique indexNumber={0} indexLetter="Z"></CardIndexStatique> */}
        </Stack>
    );
};
export default CardInventory;
