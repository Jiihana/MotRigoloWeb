import { useContext } from 'react';
import { Box, Stack } from '@mui/material';
import CardInventory from '../CardIndex/CardInventory';
import { GameContext } from '../../../../contexts/GameContext';

const CardsInventory = () => {
    const gameContext = useContext(GameContext);

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
                {gameContext?.cardsInventory.map((card) => {
                    const number = card.charAt(1);
                    const letter = card.charAt(0);
                    return <CardInventory key={letter} textNumber={+number} textLetter={letter} />;
                })}
            </Stack>
        </Box>
    );
};
export default CardsInventory;
