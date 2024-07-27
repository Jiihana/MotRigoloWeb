import React, { useState } from 'react';
import { Box, colors, Stack } from '@mui/material';
import CardInventory from '../CardIndex/CardInventory';

interface CardsInventoryInterface {
    cardsInInventory: { [key: string]: number };
}

const CardsInventory = (props: CardsInventoryInterface) => {
    return (
        <Box
            sx={{
                height: '65%',
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
            }}
        >
            <Stack spacing={5} sx={{ height: '100%', width: '100%' }}>
                {Object.entries(props.cardsInInventory).map(([key, value]) => (
                    <CardInventory key={key} textNumber={value} textLetter={key} />
                ))}
            </Stack>
        </Box>
    );
};
export default CardsInventory;
