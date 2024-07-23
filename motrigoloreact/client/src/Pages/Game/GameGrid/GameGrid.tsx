import React, { useEffect } from 'react';

import { Box, colors, Stack } from '@mui/material';
import GameGridHeader from './GameGridHeader';
import GameGridIndex from './GameGridIndex';

interface DynamicGridProps {
    numberOfCardPerRow: number;
}

const GameGrid = (props: DynamicGridProps) => {
    return (
        <Stack
            display="flex"
            direction="column"
            sx={{ justifyItems: 'center', alignItems: 'center', backgroundColor: colors.green[300], height: '100%', width: '100%' }}
            spacing={4}
        >
            <Box sx={{ backgroundColor: colors.pink[300], height: 'auto', width: '60%' }}>
                <GameGridHeader numberOfCardPerRow={props.numberOfCardPerRow} direction="row" spacing={4}></GameGridHeader>
            </Box>

            <Stack spacing={10} direction="row" sx={{ backgroundColor: colors.orange[300], height: 'auto', width: '100%' }}>
                <Box sx={{ backgroundColor: colors.grey[300], height: 'auto', width: '12%' }}>
                    <GameGridHeader numberOfCardPerRow={props.numberOfCardPerRow} direction="column" spacing={-4}></GameGridHeader>
                </Box>

                <Box
                    sx={{ backgroundColor: colors.purple[300], height: '100%', width: '70%', justifyItems: 'center', alignItems: 'center' }}
                    display="flex"
                >
                    <GameGridIndex numberOfCardPerRow={props.numberOfCardPerRow}></GameGridIndex>
                </Box>
            </Stack>
        </Stack>
    );
};

export default GameGrid;
