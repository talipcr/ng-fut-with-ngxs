import { Player } from "./models/fut.models";

export class GetAllTeams {
    static type = 'Get all teams';
    constructor(){};
}

export class AddPlayer {
    static type = 'Add a player';
    constructor(public teamId: number, public player: Player){};
}