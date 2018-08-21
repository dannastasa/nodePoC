import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { AirportRouter } from "./controllers";

class App {

    constructor() {
        this.app = express();
        
        this.config();
        this.mongoConfig();

        this.routes();
    }

    public app: express.Application;
    private mongoUrl: string = 'mongodb://localhost:27017/AirportsDatabase';

    private config(): void {
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoConfig(): void {
        const options = {
            socketTimeoutMS: 30000,
            keepAlive: true,
            reconnectTries: 30000,
            useNewUrlParser: true
        };

        mongoose.connect(this.mongoUrl, options).then(() => {
                console.log('Connection to Mongo succeeded');
            }, (error) => {
                console.log('Connection to Mongo failed. Reason: ' + error);
            });
    }

    private routes(): void {
        this.app.use('/api/v1/airports', AirportRouter);
    }
}

export default new App().app;