import { Avatar, Box, colors, Stack, Typography } from '@mui/material';
import CardWithText from '../Game/Cards/CardWithText/CardWithText';

export interface CardGridInterface {}

const CardHeaderVerticale = (props: CardGridInterface) => {
    return (
        <Stack
            sx={{
                height: '145%',
                width: '80%',
                backgroundColor: colors.amber[500]
            }}
        >
            <CardWithText cardText="pouet" backgroundImage="url(/images/cardGrid.png)" height="80%" width="100%" textVariant="h2" />
            <CardWithText cardText="pouet" backgroundImage="url(/images/cardWord.png)" height="25%" width="100%" textVariant="body1" />
        </Stack>
    );
};

export default CardHeaderVerticale;
