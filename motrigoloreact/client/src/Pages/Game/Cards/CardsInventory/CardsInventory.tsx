import { useContext } from 'react';
import { Box, colors, Stack } from '@mui/material';
import CardInventory from '../CardIndex/CardInventory';
import { GameContext } from '../../../../contexts/GameContext';

const CardsInventory = () => {
    const gameContext = useContext(GameContext);

    const getHeight = (): { xs: string; sm: string; md: string; lg: string; xl: string } => {
        const length = gameContext?.cardsInventory.length || 0;

        if (length === 1) {
            return { xs: '100px', sm: '100px', md: '90px', lg: '110px', xl: '130px' };
        }
        if (length === 2) {
            return { xs: '30%', sm: '35%', md: '40%', lg: '110px', xl: '50%' };
        }
        if (length > 2) {
            return { xs: '50%', sm: '55%', md: '65%', lg: '70%', xl: '75%' };
        }

        return { xs: '0%', sm: '0%', md: '0%', lg: '0%', xl: '0%' };
    };

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
            }}
        >
            <Stack spacing={5} sx={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
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
