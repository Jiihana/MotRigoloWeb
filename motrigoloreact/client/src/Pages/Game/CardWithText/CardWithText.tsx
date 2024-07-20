import { Avatar, Box, colors, Typography } from '@mui/material';

export interface CardGridInterface {
    cardText: string;
    backgroundImage: string;
    height: string;
}

const CardWithText = (props: CardGridInterface) => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: props.height,
                width: props.height,
                overflow: 'hidden' // Ensure the image is cropped to the circle
            }}
        >
            <Avatar
                alt="backgroundCard"
                src={props.backgroundImage}
                variant="rounded"
                sx={{
                    height: props.height,
                    width: props.height
                }}
            ></Avatar>
            {props.cardText != '' ? (
                <Typography
                    variant="h3"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'black'
                    }}
                >
                    {props.cardText}
                </Typography>
            ) : null}
        </Box>
    );
};

export default CardWithText;
