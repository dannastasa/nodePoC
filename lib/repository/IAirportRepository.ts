import { ICrudRepository } from "./ICrudRepository";
import { Airport } from "models/Airport";

export abstract class IAirportRepository extends ICrudRepository<Airport> {
    abstract getAirportsByCity(city: string): Promise<Airport[]>;
}