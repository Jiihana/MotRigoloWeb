import { Avatar, Box, colors, Typography } from '@mui/material';

export interface CardGridInterface {
    cardText: string;
    backgroundImage: string;
    height: string;
}

const CardWithText = (props: CardGridInterface) => {
    return (
        <Avatar
            alt="backgroundCard"
            src={props.backgroundImage}
            variant="rounded"
            sx={{
                height: props.height,
                width: props.height
            }}
        >
            {props.cardText != '' ? (
                <Typography variant="h3" sx={{}}>
                    {props.cardText}
                </Typography>
            ) : null}
        </Avatar>
    );
};

export default CardWithText;
