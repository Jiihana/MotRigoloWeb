import { Avatar, Box, colors, Stack, Typography } from '@mui/material';

export interface CardGridInterface {}

const CardGrid = (props: CardGridInterface) => {
    return (
        <Stack
            sx={{
                height: '100%',
                width: '100%',
                backgroundColor: colors.amber[500]
            }}
        >
            <Box
                display="flex"
                sx={{
                    position: 'relative',
                    height: '80%',
                    width: 'auto',
                    backgroundImage: 'url(/images/cards/cardGrid.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: colors.pink[500]
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%)`,
                        color: 'black'
                    }}
                >
                    C
                </Typography>
            </Box>
        </Stack>
    );
};

export default CardGrid;
