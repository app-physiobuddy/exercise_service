import express from 'express';
import { router } from './adapters/routes.js';
import ErrorHandler from './utils/errors/ErrorHandler.js';
import * as dotenv from 'dotenv';
dotenv.config();
console.log(process.env.APP_PORT);
console.log(process.env.DATABASE_URL);
const app = express();
app.use(express.json());
// Mount the routes
app.use('', router);
// express specific error handling middleware
app.use(ErrorHandler.middleware);
const APP_PORT = process.env.APP_PORT;
app.listen(APP_PORT, () => {
    console.log(`TS Exercise service is running on http://localhost:${APP_PORT}`);
});
