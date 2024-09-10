import { useContext } from 'react';
import { Box, colors, Stack } from '@mui/material';
import CardInventory from '../CardIndex/CardInventory';
import { GameContext } from '../../../../contexts/GameContext';

const CardsInventory = () => {
    const gameContext = useContext(GameContext);

    const getHeight = (): string => {
        const length = gameContext?.cardsInventory.length || 0;

        if (length === 0) {
            return '0%';
        }
        if (length === 1) {
            return '18%';
        }
        if (length === 2) {
            return '40%';
        }
        if (length > 2) {
            return '65%';
        }

        return '0%'; // Fallback case
    };

    const height = getHeight();
    return (
        <Box
            sx={{
                height: height,
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
                    return <CardInventory key={card} textNumber={+number} textLetter={letter} />;
                })}
            </Stack>
        </Box>
    );
};
export default CardsInventory;
