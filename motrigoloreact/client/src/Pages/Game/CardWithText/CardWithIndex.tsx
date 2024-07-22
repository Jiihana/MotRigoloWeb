import { Avatar, Box, colors, Typography, TypographyPropsVariantOverrides } from '@mui/material';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';

export interface CardGridInterface {
    cardIndexNumber: string;
    cardIndexLetter: string;
    backgroundImage: string;
    height: string;
    width: string;
    cardTextSize: TypographyVariant;
    onClickHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CardWithIndex = (props: CardGridInterface) => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: props.height,
                width: props.width
            }}
            onClick={props.onClickHandler}
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
                {props.cardIndexNumber}
            </Typography>
            <Typography
                variant={props.cardTextSize}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-0%, -0%)',
                    color: 'black'
                }}
            >
                {props.cardIndexLetter}
            </Typography>
        </Box>
    );
};

export default CardWithIndex;
