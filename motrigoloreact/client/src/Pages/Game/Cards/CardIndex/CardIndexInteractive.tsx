import React, { useState } from 'react';
import CardWithTextIndex from '../CardWithText/CardWithTextIndex';
import { Box, colors } from '@mui/material';

interface CardIndexInterface {
    indexNumber: number;
    indexLetter: string;
}

const CardIndexInteractive = (props: CardIndexInterface) => {
    const frontBackground = 'url(/images/cardIndexFront.png)';
    const backBackground = 'url(/images/cardIndexBack.png)';

    const [textLetter, setTextLetter] = useState('');
    const [textNumber, setTextNumber] = useState('');
    const [background, setBackground] = useState(backBackground);

    function setTextLetterHandler() {
        return textLetter == '' ? setTextLetter(props.indexLetter) : setTextLetter('');
    }

    function setTextNumberHandler() {
        return textNumber == '' ? setTextNumber(props.indexNumber.toString()) : setTextNumber('');
    }

    function setBackgroundHandler() {
        return background == backBackground ? setBackground(frontBackground) : setBackground(backBackground);
    }

    function ToggleCard() {
        setTextLetterHandler();
        setTextNumberHandler();
        setBackgroundHandler();
        console.log('poue');
    }

    return (
        <Box
            sx={{
                height: '115%',
                width: '80%'
            }}
        >
            <CardWithTextIndex
                backgroundImage={background}
                cardIndexNumber={textNumber}
                cardIndexLetter={textLetter}
                cardTextSize="h5"
                onClickHandler={ToggleCard}
            ></CardWithTextIndex>
        </Box>
    );
};
export default CardIndexInteractive;
