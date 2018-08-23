import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IAirportRepository } from "../repository/IAirportRepository";
import { Airport } from "../models/Airport";

@Provides(AirportController)
export class AirportController {
    private router: Router;

    @Inject
    private airportRepository: IAirportRepository;

    private airportModel;

    constructor() {
        this.router = Router();
        this.init();
        this.airportModel = new Airport().getModelForClass(Airport);
    }

    public getAll(req: Request, res: Response): void {
        this.airportRepository.getAll()
            .then(airports => res.status(200).json(airports))
            .catch(err => res.status(400).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.airportRepository.getById(req.params.id)
            .then(airport => res.status(200).json(airport))
            .catch(() => res.status(404).send());
    }

    public add(req: Request, res: Response): void {
        const newAirport = new this.airportModel(req.body);

        this.airportRepository.add(newAirport)
            .then(airport => res.status(200).json(airport))
            .catch(err => res.status(400).send(err));
    }

    public update(req: Request, res: Response): void {
        const airport = new this.airportModel(req.body);

        this.airportRepository.update(req.params.id, airport)
            .then(airport => res.status(200).json(airport))
            .catch(err => res.status(400).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.airportRepository.delete(req.params.id)
            .then(() => res.status(204).send())
            .catch(err => res.status(400).send(err));
    }


    init(): any {
        this.router.get('/', this.getAll.bind(this))
            .get('/:id', this.getById.bind(this))
            .post('/', this.add.bind(this))
            .put('/:id', this.update.bind(this))
            .delete('/:id', this.delete.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}