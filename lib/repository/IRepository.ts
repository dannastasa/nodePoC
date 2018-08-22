import { Document } from 'mongoose';
import { Typegoose } from '../../node_modules/typegoose';

export interface IRepository<T extends Typegoose> {
    getAll(): Promise<Document[]>;

    getById(id: String): Promise<Document>;
    
    add(document: Document): Promise<Document>;
    
    update(id: String, document: Document): Promise<Document>;
    
    delete(id: String): Promise<Document>;
}