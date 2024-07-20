import { Avatar, Box, colors, Typography, TypographyPropsVariantOverrides } from '@mui/material';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';

export interface CardGridInterface {
    cardText: string;
    backgroundImage: string;
    height: string;
    width: string;
    cardTextSize: TypographyVariant;
}

const CardWithText = (props: CardGridInterface) => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: props.height,
                width: props.width
            }}
        >
            <Avatar
                alt="backgroundCard"
                src={props.backgroundImage}
                variant="rounded"
                sx={{
                    height: '100%',
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
