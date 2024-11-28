import express from 'express';
import { router } from './adapters/routes.js';
import ErrorHandler from './utils/errors/ErrorHandler.js';
const app = express();
app.use(express.json());
// Mount the routes
app.use('', router);
// express specific error handling middleware
app.use(ErrorHandler.middleware);
const APP_PORT = process.env.APP_PORT || 3001;
app.listen(APP_PORT, () => {
    console.log(`TS node server is running on http://localhost:${APP_PORT}`);
});