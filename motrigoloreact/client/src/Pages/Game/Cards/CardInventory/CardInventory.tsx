import React, { useState } from 'react';
import { Box, colors, Stack } from '@mui/material';
import CardIndexStatique from '../CardIndex/CardIndexStatique';

const CardInventory = () => {
    return (
        <Stack spacing={4} sx={{ height: 'auto', width: '40%' }}>
            <CardIndexStatique indexNumber={5} indexLetter="D"></CardIndexStatique>
            <CardIndexStatique indexNumber={5} indexLetter="D"></CardIndexStatique>
            <CardIndexStatique indexNumber={5} indexLetter="D"></CardIndexStatique>
        </Stack>
    );
};
export default CardInventory;
