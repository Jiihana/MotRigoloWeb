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
                backgroundPosition: 'top-left',
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
                        xs: props.isCardGrid ? '2rem' : props.cardText === 'Pioche' ? '1.25rem' : '0.5rem',
                        sm: props.isCardGrid ? '3rem' : props.cardText === 'Pioche' ? '1.25rem' : '0.7rem',
                        md: props.isCardGrid ? '4rem' : props.cardText === 'Pioche' ? '1.25rem' : '0.9rem',
                        lg: props.isCardGrid ? '5rem' : props.cardText === 'Pioche' ? '1.75rem' : '1rem',
                        xl: props.isCardGrid ? '6rem' : props.cardText === 'Pioche' ? '2rem' : '1.2rem'
                    },
                    fontFamily: props.isCardGrid ? 'TypeWrong, cursive' : 'Shine Typewriter, sans-serif'
                }}
            >
                {props.cardText}
            </Typography>
        </Box>
    );
};

export default CardWithText;
