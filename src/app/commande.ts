import { Ligne } from "./ligne";

export class Commande {
    id: number;
    prixTotal: number;
    infos: string;
    userId: number;
    lignes: Ligne[];
    version: number;


    constructor(id?,  infos?, userId = 0) {
        if(id) this.id = id;
        if(infos) this.infos = infos;
        this.lignes = new Array<Ligne>();
        this.userId = userId;
    }

    addLigne(ligne: Ligne): void {
        this.lignes.push(ligne);
    }

    formatInfos() {
        
    }
}
