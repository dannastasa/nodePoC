import { IRepository } from "./IRepository";
import { Airport } from "../models/Airport";
import { Document } from 'mongoose';

export class AirportRepository implements IRepository<Airport> {
    
    private AirportModel;

    constructor() {
        this.AirportModel = new Airport().getModelForClass(Airport);
    }

    getAll(): Promise<Document[]> {
        return this.AirportModel.find().exec();
    }    
    
    getById(id: String): Promise<Document> {
        return this.AirportModel.findById(id).exec();
    }

    add(document: Document): Promise<Document> {
        return document.save();
    }

    update(id: String, document: Document): Promise<Document> {
        return this.AirportModel.findByIdAndUpdate(id, document).exec();
    }

    delete(id: String): Promise<Document> {
        return this.AirportModel.findByIdAndRemove(id).exec();
    }
}