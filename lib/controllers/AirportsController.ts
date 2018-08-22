import { Request, Response, Router } from "express";
import { AirportRepository } from '../repository/AirportRepository';
import { IRepository } from "repository/IRepository";
import { Airport } from "../models/Airport";

class AirportController {
    router: Router;

    private airportRepository: IRepository<Airport>;

    constructor() {
        this.airportRepository = new AirportRepository();
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response): void {
        this.airportRepository.getAll()
            .catch(err => res.status(500).send(err))
            .then(airports => res.json(airports));
    }

    public getById(req: Request, res: Response): void {
        this.airportRepository.getById(req.params.id)
            .catch(err => res.status(500).send(err))
            .then(airport => {
                if (airport == null) {
                    res.status(404);
                }
                res.json(airport);
            });
    }

    public add(req: Request, res: Response): void {
        this.airportRepository.add(req.body)
            .catch(err => res.status(400).send(err))
            .then(airport => res.json(airport));
    }

    public update(req: Request, res: Response): void {
        this.airportRepository.update(req.params.id, req.body)
            .catch(err => res.status(400).send(err))
            .then(airport => res.json(airport));
    }

    public delete(req: Request, res: Response): void {
        this.airportRepository.delete(req.params.id)
            .catch(err => res.status(400).send(err))
            .then(() => res.status(204).json());
    }


    init(): any {
        this.router.get('/', this.getAll.bind(this))
            .get('/:id', this.getById.bind(this))
            .post('/', this.add.bind(this))
            .put('/:id', this.update.bind(this))
            .delete('/:id', this.delete.bind(this));
    }
}

export const AirportRouter = new AirportController().router;