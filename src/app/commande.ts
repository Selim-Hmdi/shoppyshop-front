import { Ligne } from "./ligne";

export class Commande {
    id: number;
    prixTotal: number;
    infos: string;
    userId: number;
    lignes: Ligne[]
    version: number;


    constructor(id?, prixTotal?, infos?, userId?) {
        this.id = id;
        this.lignes = new Array<Ligne>();
        this.prixTotal = prixTotal;
        this.infos = infos;
        this.userId = userId;
    }

    addLigne(ligne: Ligne): void {

    }
}
