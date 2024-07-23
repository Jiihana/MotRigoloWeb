import React, { useState } from 'react';
import { Box, colors, Stack } from '@mui/material';
import CardIndexStatique from '../CardIndex/CardIndexStatique';

const CardInventory = () => {
    return (
        <Stack spacing={4} sx={{ height: 'auto', width: '50%', backgroundColor: colors.pink[500] }}>
            <CardIndexStatique indexNumber={5} indexLetter="D"></CardIndexStatique>
            <CardIndexStatique indexNumber={5} indexLetter="D"></CardIndexStatique>
            <CardIndexStatique indexNumber={5} indexLetter="D"></CardIndexStatique>
        </Stack>
    );
};
export default CardInventory;
