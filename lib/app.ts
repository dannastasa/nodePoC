import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { AirportController } from "./controllers";
import { config, IocContainerConfig } from "./config";
import { Inject } from "typescript-ioc";

export class App {

    constructor() {
        this.app = express();

        this.config();
        this.mongoConfig();

        this.routes();
    }

    private app: express.Application;

    @Inject
    private airportController: AirportController;

    private config(): void {
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));

        IocContainerConfig.configure();
    }

    private mongoConfig(): void {
        const { db: { host, port, name } } = config;
        const mongoUrl = `mongodb://${host}:${port}/${name}`;

        mongoose.connect(mongoUrl, { useNewUrlParser: true })
            .then(() => {
                console.log('Connection to Mongo succeeded');
            }, (error) => {
                console.log('Connection to MongoDB failed. Reason: ')
                console.log(error);
            });
    }

    private routes(): void {
        this.app.use('/api/v1/airports', this.airportController.getRoutes());
    }

    public getExpressApp(): express.Application {
        return this.app;
    }
}