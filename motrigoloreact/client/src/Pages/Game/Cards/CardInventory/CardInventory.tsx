import React, { useState } from 'react';
import { Box, colors, Stack } from '@mui/material';
import CardIndexStatique from '../CardIndex/CardIndexStatique';
import CardWithText from '../CardWithText/CardWithText';

const CardInventory = () => {
    return (
        <Box
            display="flex"
            sx={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Stack spacing={4} sx={{ height: 'auto', width: '30%' }}>
                <CardWithText
                    cardText="D4"
                    backgroundImage={''}
                    height={'100%'}
                    width={'100%'}
                    textVariant="h2"
                    textShouldRotate={false}
                ></CardWithText>
                <CardWithText
                    cardText="D4"
                    backgroundImage={''}
                    height={'100%'}
                    width={'100%'}
                    textVariant="h2"
                    textShouldRotate={false}
                ></CardWithText>
                <CardWithText
                    cardText="D4"
                    backgroundImage={''}
                    height={'100%'}
                    width={'100%'}
                    textVariant="h2"
                    textShouldRotate={false}
                ></CardWithText>
            </Stack>
        </Box>
    );
};
export default CardInventory;
