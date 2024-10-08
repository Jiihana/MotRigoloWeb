import { Box, Stack, Typography } from '@mui/material';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';

export interface CardGridInterface {
    cardIndexNumber: string;
    cardIndexLetter: string;
    backgroundImage: string;
    backgroundImageHover: string;
    cardTextSize: TypographyVariant;
    onClickHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CardWithTextIndex = (props: CardGridInterface) => {
    return (
        <Box
            onClick={props.onClickHandler}
            sx={{
                position: 'relative',
                height: '100%',
                width: '100%',
                backgroundImage: props.backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                '&:hover': {
                    backgroundImage: props.backgroundImageHover || props.backgroundImage
                }
            }}
        >
            <Stack direction="row">
                <Typography
                    variant="h1"
                    sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        color: 'black',
                        fontSize: {
                            xs: '3rem',
                            lg: '4rem',
                            xl: '5rem'
                        }
                    }}
                >
                    {props.cardIndexLetter}
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '65%',
                        color: 'black',
                        fontSize: {
                            xs: '1.5rem',
                            lg: '1.75rem',
                            xl: '2rem'
                        }
                    }}
                >
                    {props.cardIndexNumber}
                </Typography>
            </Stack>
        </Box>
    );
};

export default CardWithTextIndex;
