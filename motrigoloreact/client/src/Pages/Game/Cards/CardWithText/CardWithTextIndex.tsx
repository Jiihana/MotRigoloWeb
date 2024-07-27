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
            onClick={props.onClickHandler}
            sx={{
                position: 'relative',
                height: '100%',
                width: '100%',
                backgroundImage: props.backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Stack direction="row">
                <Typography
                    variant="h1"
                    sx={{
                        position: 'absolute',
                        transform: `translate(20%,10%)`,
                        color: 'black'
                    }}
                >
                    {props.cardIndexLetter}
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(50%, -40%)`,
                        color: 'black'
                    }}
                >
                    {props.cardIndexNumber}
                </Typography>
            </Stack>
        </Box>
    );
};

export default CardWithTextIndex;
