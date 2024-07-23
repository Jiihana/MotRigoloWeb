import React, { useEffect } from 'react';

import { Box, colors, Stack } from '@mui/material';
import GameGridHeader from './GameGridHeader';
import GameGridIndex from './GameGridIndex';

interface DynamicGridProps {
    numberOfCardPerRow: number;
}

const GameGrid = (props: DynamicGridProps) => {
    return (
        <Stack direction="column" sx={{ justifyItems: 'center', alignItems: 'center', height: '100%', width: '100%' }} spacing={1}>
            <Box sx={{ height: 'auto', width: '70%' }}>
                <GameGridHeader numberOfCardPerRow={props.numberOfCardPerRow} direction="row" spacing={4} marginLeft="5%"></GameGridHeader>
            </Box>

            <Stack spacing={10} direction="row" sx={{ height: 'auto', width: '100%' }}>
                <Box sx={{ height: 'auto', width: '12%' }}>
                    <GameGridHeader numberOfCardPerRow={props.numberOfCardPerRow} direction="column" spacing={-4} marginLeft="0"></GameGridHeader>
                </Box>

                <Box sx={{ height: '100%', width: '70%', justifyItems: 'center', alignItems: 'center' }} display="flex">
                    <GameGridIndex numberOfCardPerRow={props.numberOfCardPerRow}></GameGridIndex>
                </Box>
            </Stack>
        </Stack>
    );
};

export default GameGrid;
