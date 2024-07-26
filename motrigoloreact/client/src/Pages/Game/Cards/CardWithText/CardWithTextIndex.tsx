import { Avatar, Box, colors, Stack, Typography, TypographyPropsVariantOverrides } from '@mui/material';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';

export interface CardGridInterface {
    cardIndexNumber: string;
    cardIndexLetter: string;
    backgroundImage: string;
    cardTextSize: TypographyVariant;
    onClickHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CardWithTextIndex = (props: CardGridInterface) => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                width: '100%',
                backgroundImage: 'url(/images/cardIndexBack.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: colors.pink[500]
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%)`,
                    color: 'black'
                }}
            >
                B
            </Typography>
        </Box>
    );
};

export default CardWithTextIndex;
