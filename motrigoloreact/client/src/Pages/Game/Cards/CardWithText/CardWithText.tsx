import { Box, Typography, TypographyVariant } from '@mui/material';

export interface CardWithTextInterface {
    cardText: string;
    backgroundImage: string;
    backgroundImageHover: string;
    height: string;
    width: string;
    textVariant: TypographyVariant;
    textShouldRotate: boolean;
    isCardGrid: boolean;
}

const CardWithText = (props: CardWithTextInterface) => {
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
                '&:hover': {
                    backgroundImage: props.backgroundImageHover || props.backgroundImage
                }
            }}
        >
            <Typography
                variant={props.textVariant}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) ${props.textShouldRotate ? 'rotate(270deg)' : ''}`,
                    color: 'black',
                    fontSize: {
                        xs: props.isCardGrid ? '2rem' : '1.1rem',
                        sm: props.isCardGrid ? '3rem' : '0.4rem',
                        md: props.isCardGrid ? '4rem' : '0.6rem',
                        lg: props.isCardGrid ? '5rem' : '0.8rem',
                        xl: props.isCardGrid ? '6rem' : '1.1rem'
                    }
                }}
            >
                {props.cardText}
            </Typography>
        </Box>
    );
};

export default CardWithText;
