import http from 'http';
import express from 'express';
import { ServerSocket } from './serverSocket';
import { GameManager } from './motrigolo/GameManager';
import { serverApiMotRigolo } from './motrigolo/motRigoloServerApi';
import cors from 'cors';
require('dotenv').config({ path: ['.env.local', '.env'] });

const application = express();
/** Server Handling */
const httpServer = http.createServer(application);

/** Start Socket */
new ServerSocket(httpServer);

new GameManager();

application.use(
    cors({
        origin: '*', // unless...
        credentials: true //access-control-allow-credentials:true
    })
);

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

serverApiMotRigolo.registerEndpoint(application);

/** Parse the body of the request */
application.use(express.urlencoded({ extended: true }));
application.use(express.json());

/** Rules of our API */
application.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, gameId, playerId');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Healthcheck */
application.get('/ping', (req, res, next) => {
    return res.status(200).json({ hello: 'world!' });
});

/** Socket Information */
application.get('/status', (req, res, next) => {
    return res.status(200).json({ users: ServerSocket.instance.users });
});

/** Error handling */
application.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

/** Listen */
httpServer.listen(process.env.REACT_APP_GAMESERVER_PORT, () => console.info(`Server is running`));
