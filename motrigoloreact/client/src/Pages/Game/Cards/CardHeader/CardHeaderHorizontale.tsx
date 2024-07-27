import { Avatar, Box, colors, Stack, Typography } from '@mui/material';
import CardWithText from '../CardWithText/CardWithText';

export interface CardGridInterface {}

const CardHeaderHorizontale = (props: CardGridInterface) => {
    return (
        <Stack
            direction="row"
            sx={{
                height: '115%',
                width: '100%',
                backgroundColor: colors.amber[500]
            }}
        >
            <CardWithText cardText="pouet" backgroundImage="url(/images/cardGrid.png)" height="100%" width="80%" textVariant="h2" />
            <CardWithText cardText="pouet" backgroundImage="url(/images/cardWord.png)" height="100%" width="25%" textVariant="body1" />
        </Stack>
    );
};

export default CardHeaderHorizontale;
