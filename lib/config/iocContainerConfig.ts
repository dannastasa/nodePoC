import { Container } from "typescript-ioc";
import { AirportRepository } from "../repository/AirportRepository";
import { IAirportRepository } from "../repository/IAirportRepository";

export class IocContainerConfig {

    static configure() {
        Container.bind(IAirportRepository).to(AirportRepository);
    }
}