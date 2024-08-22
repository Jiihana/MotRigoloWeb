import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../contexts/SocketContext';
import { AlertResponse } from '../../common/socket_messages/Alert';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Alert() {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { socket } = useContext(SocketContext).SocketState;
    const navigate = useNavigate();

    useEffect(() => {
        socket?.on(AlertResponse.Message, (args: AlertResponse) => {
            setErrorMessage(args.message);
            setOpen(true);
        });
    }, []);

    const handleClose = () => {
        setOpen(false);
        navigate('/');
    };

    return (
        <>
            <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Une erreur fatale est survenue. Merci de me prévenir et de m'envoyer ce message: {errorMessage}. Il faut rafraichir la page!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Retourner à l'accueil</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
