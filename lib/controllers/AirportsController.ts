import * as mongoose from 'mongoose';
import { Request, Response, Router } from "express";
import { AirportSchema } from "../models/AirportModel";

const Airport = mongoose.model('Airport', AirportSchema);

class AirportController {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response): void {
        Airport.find((err, airports) => {
            if(err) {
                res.status(500).send(err);
            } 
            res.json(airports);
        });
    }

    public getById(req: Request, res: Response): void {
        Airport.findById(req.params.id, (err, airport) => {
            if(err) {
                res.status(500).send(err);
            }
            res.json(airport);
        });
    }

    public add(req: Request, res: Response): void {
        let newAirport = new Airport(req.body);

        newAirport.save((err, airport) => {
            if(err){
                res.status(400).send(err);
            } 

            res.json(airport);
        });
    }

    public update(req: Request, res: Response): void {
        Airport.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, airport) => {
            if(err) {
                res.status(400).send(err);
            }
            res.json(airport);
        });
    }

    public delete(req: Request, res: Response): void {
        Airport.findByIdAndDelete(req.params.id, (err) => {
            if(err) {
                res.status(400).send(err);
            }
            res.status(204).json({});
        });
    }
    

    init(): any {
        this.router.get('/', this.getAll)
                   .get('/:id', this.getById)
                   .post('/', this.add)
                   .put('/:id', this.update)
                   .delete('/:id', this.delete);
    }
}

export const AirportRouter = new AirportController().router;