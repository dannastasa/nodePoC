import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { AirportRouter } from "./controllers";
import { config } from "./config/config";

class App {

    constructor() {
        this.app = express();
        
        this.config();
        this.mongoConfig();

        this.routes();
    }

    public app: express.Application;
    
    private config(): void {
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoConfig(): void {
        const { db: { host, port, name } } = config;
        const mongoUrl = `mongodb://${host}:${port}/${name}`;

        mongoose.connect(mongoUrl, { useNewUrlParser: true })
                .then(() => {
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