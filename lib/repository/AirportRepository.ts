import { Airport } from "../models/Airport";
import { Provides } from "typescript-ioc";
import { IAirportRepository } from "./IAirportRepository";

@Provides(IAirportRepository)
export class AirportRepository implements IAirportRepository {
    
    private AirportModel;

    constructor() {
        this.AirportModel = new Airport().getModelForClass(Airport);
    }

    public getAll(): Promise<Airport[]> {
        return this.AirportModel.find().exec();
    }    
    
    public getById(id: string): Promise<Airport> {
        return this.AirportModel.findById(id).exec();
    }

    public add(document: Airport): Promise<Airport> {
        let newAirport = new this.AirportModel(document);
        return newAirport.save();
    }

    public update(id: string, document: any): Promise<Airport> {
        return this.AirportModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Airport> {
        return this.AirportModel.findByIdAndRemove(id).exec();
    }

    public getAirportsByCity(cityName: string): Promise<Airport[]> {
        return this.AirportModel.find({city: cityName}).exec();
    }
}