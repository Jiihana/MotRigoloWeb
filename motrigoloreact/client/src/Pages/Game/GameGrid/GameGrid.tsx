import React, { useEffect } from 'react';

import { Box, colors, Stack } from '@mui/material';
import GameGridHeader from './GameGridHeader';
import GameGridIndex from './GameGridIndex';

interface DynamicGridProps {
    numberOfCardPerRow: number;
}

const GameGrid = (props: DynamicGridProps) => {
    return (
        <Box sx={{ alignContent: 'center', justifyContent: 'center', height: '40%', width: '40%', backgroundColor: colors.amber[500] }}>
            <GameGridHeader numberOfCardPerRow={props.numberOfCardPerRow} direction="row"></GameGridHeader>
            <Stack direction="row">
                {/* <GameGridHeader numberOfCardPerRow={props.numberOfCardPerRow} direction="column"></GameGridHeader> */}
                {/* <GameGridIndex numberOfCardPerRow={props.numberOfCardPerRow}></GameGridIndex> */}
            </Stack>
        </Box>
    );
};

export default GameGrid;
