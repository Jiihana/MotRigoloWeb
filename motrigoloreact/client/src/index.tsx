import ReactDOM from 'react-dom/client';
import Application from './Application';
import SocketContextComponent from './contexts/SocketContextComponent';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <SocketContextComponent>
        <Application />
    </SocketContextComponent>
);
