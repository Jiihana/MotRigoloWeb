import { Avatar, Box, colors, Typography, TypographyPropsVariantOverrides, TypographyVariant } from '@mui/material';

export interface CardGridInterface {
    cardText: string;
    backgroundImage: string;
    height: string;
    cardTextSize: TypographyVariant;
}

const CardWithText = (props: CardGridInterface) => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: props.height,
                width: 'auto'
            }}
        >
            <Avatar
                alt="backgroundCard"
                src={props.backgroundImage}
                variant="rounded"
                sx={{
                    height: 'auto',
                    width: '100%'
                }}
            ></Avatar>
            {props.cardText != '' ? (
                <Typography
                    variant={props.cardTextSize}
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
