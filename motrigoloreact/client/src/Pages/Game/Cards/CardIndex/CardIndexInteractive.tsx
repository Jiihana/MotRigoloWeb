import { useContext, useEffect, useState } from 'react';
import CardWithTextIndex from '../CardWithText/CardWithTextIndex';
import { Box } from '@mui/material';
import SocketContext from '../../../../contexts/SocketContext';
import { FlipOverCardRequest, FlipOverCardResponse } from '../../../../common/socket_messages/FlipOverCard';

interface CardIndexInterface {
    indexNumber: number;
    indexLetter: string;
}

const CardIndexInteractive = (props: CardIndexInterface) => {
    const frontBackground = 'url(/images/cards/cardIndexFront.png)';
    const backBackground = 'url(/images/cards/cardIndexBack.png)';

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

    function FlipOverCard() {
        setTextLetterHandler();
        setTextNumberHandler();
        setBackgroundHandler();
    }

    const { socket } = useContext(SocketContext).SocketState;

    const FlipOverCardHandler = () => {
        socket?.emit(FlipOverCardRequest.Message, new FlipOverCardRequest(`${props.indexLetter}${props.indexNumber}`));
        console.log(`Demande de card retournée: ${props.indexLetter}${props.indexNumber}`);
    };

    useEffect(() => {
        socket?.on(FlipOverCardResponse.Message, (args: FlipOverCardResponse) => {
            if (args.cardIndex == `${props.indexLetter}${props.indexNumber}`) {
                FlipOverCard();
                console.log(`Reponse card retournée: ${props.indexLetter}${props.indexNumber}`);
            }
        });
    }, []);

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
                onClickHandler={FlipOverCardHandler}
            ></CardWithTextIndex>
        </Box>
    );
};
export default CardIndexInteractive;
