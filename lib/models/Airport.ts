import { prop, Typegoose } from 'typegoose';

export class Airport extends Typegoose {
    @prop({required: true})
    name: string;

    @prop({required: true})
    city: string;

    @prop({required: true})
    country: string;

    @prop({required: true})
    planeCapacity: Number;

    @prop({default: Date.now})
    creationDate: Date;
}