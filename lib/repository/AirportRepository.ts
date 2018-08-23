import { Airport } from "../models/Airport";
import { Provides } from "typescript-ioc";
import { IAirportRepository } from "./IAirportRepository";

@Provides(IAirportRepository)
export class AirportRepository implements IAirportRepository {
    
    private AirportModel;

    constructor() {
        this.AirportModel = new Airport().getModelForClass(Airport);
    }

    getAll(): Promise<Airport[]> {
        return this.AirportModel.find().exec();
    }    
    
    getById(id: String): Promise<Airport> {
        return this.AirportModel.findById(id).exec();
    }

    add(document: Airport): Promise<Airport> {
        let newAirport = new this.AirportModel(document);
        return newAirport.save();
    }

    update(id: String, document: Airport): Promise<Airport> {
        return this.AirportModel.findByIdAndUpdate(id, document).exec();
    }

    delete(id: String): Promise<Airport> {
        return this.AirportModel.findByIdAndRemove(id).exec();
    }

    getAirportsByCity(cityName: string): Promise<Airport[]> {
        return this.AirportModel.find({city: cityName}).exec();
    }
}