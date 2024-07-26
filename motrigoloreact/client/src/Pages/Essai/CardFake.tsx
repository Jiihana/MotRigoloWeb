import { Avatar, Box, colors, Stack, Typography } from '@mui/material';
import CardHeaderHorizontale from './CardHeaderHorizontale';

export interface CardGridInterface {}

const CardFake = (props: CardGridInterface) => {
    return (
        <Stack
            sx={{
                height: '100%',
                width: '100%',
                backgroundColor: colors.pink[500]
            }}
        >
            {/* <CardHeaderHorizontale text="Z"></CardHeaderHorizontale> */}
            <Box
                sx={{
                    position: 'relative',
                    height: '20%',
                    width: '100%',
                    backgroundImage: 'url(/images/cardWord.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%)`,
                        color: 'black'
                    }}
                >
                    Z
                </Typography>
            </Box>
        </Stack>
    );
};

export default CardFake;
