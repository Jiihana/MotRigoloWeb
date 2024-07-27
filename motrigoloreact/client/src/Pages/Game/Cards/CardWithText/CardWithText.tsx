import { Avatar, Box, colors, Typography, TypographyPropsVariantOverrides, TypographyVariant } from '@mui/material';

export interface CardGridInterface {
    cardText: string;
    backgroundImage: string;
    height: string;
    width: string;
    textVariant: TypographyVariant;
    textShouldRotate: boolean;
}

const CardWithText = (props: CardGridInterface) => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: props.height,
                width: props.width,
                backgroundImage: props.backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: colors.blue[500]
            }}
        >
            <Typography
                variant={props.textVariant}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) ${props.textShouldRotate ? 'rotate(270deg)' : ''}`,
                    color: 'black'
                }}
            >
                {props.cardText}
            </Typography>
        </Box>
    );
};

export default CardWithText;
