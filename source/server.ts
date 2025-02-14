import http from 'http';
import express, { Request, Response, Express, NextFunction } from 'express';
import morgan from 'morgan';
import routes from './routes';
import mongoose from 'mongoose';
import config from './common/config/config';
import cors from 'cors';
import i18nextMiddleware from 'i18next-express-middleware';
import i18next from './common/midlewares/i18next'

// It creates an instance of express app.
const app: Express = express();

//unsing i18next for localization
app.use(i18nextMiddleware.handle(i18next))

//Middleware function that logs HTTP requests and responses to the console in the development environment.
app.use(morgan('dev'));

// Middleware that parses incoming requests with urlencoded payloads.
app.use(express.urlencoded({ extended: false }));

// Middleware that parses incoming requests with JSON payloads.
app.use(express.json());

// Enables Cross-Origin Resource Sharing (CORS) for the router.
app.use(cors());

// Mounts the routes middleware on the root path of the router.
app.use('/', routes);

// This middleware route handles the requests for the routes that do not exist.
app.use((req : Request, res : Response, next : NextFunction) => {
    // const error = new Error('Endpoint not found.');
    return res.status(404).json({
        message: (req as any).t('errorMessages.endpointNotFound'),
    });
});

// It creates an http server with the provided router - router.
const httpServer = http.createServer(app);

// Port to be used for the created server.
const port = +(process.env.PORT as string) || 6060;
let server : http.Server;

// Connects to the MongoDB database using provided URL.
mongoose.connect(config.mongoose.url).then((result) => {
    // logger.info(`Connected to MongoDB : ${config.mongoose.url}`);
    server = httpServer.listen(port, () => console.log(`The server is running on port ${port}`));
});

// Enables the mongoose debugging mode. It logs all the queries of MongoDb.
mongoose.set('debug', true);

// Handles the exit of the Node.js process. If the server is running, it will close the server before exiting the process. Otherwise, it will simply exit the process.
const exitHandler = () => {
    if (server) {
        server.close(() => {
            // logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

// Handles unexpected errors by logging the error and calling the exitHandler function.
const unexpectedErrorHandler = (error: Error) => {
    //Logs an error message to the console and calls the exitHandler function.
    // logger.error(error);
    exitHandler();
};


// Registers an error handler for uncaught exceptions and unhandled rejections.
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);


// Listens for a SIGTERM signal and logs a message when it is received. If a server object is provided, it will be closed when the signal is received.
process.on('SIGTERM', () => {
    // logger.info(' received');
    if (server) {
        server.close();
    }
});

