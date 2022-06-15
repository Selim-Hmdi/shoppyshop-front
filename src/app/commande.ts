import { Ligne } from "./ligne";

export class Commande {
    id: number;
    prixTotal: number;
    infos: string;
    userId: number;
    lignes: Ligne[];
    version: number;


    constructor(userId?) {
        this.lignes = new Array<Ligne>();
        this.userId = userId;
        this.infos = "";
        this.prixTotal = 0;
        this.version = 0;
        this.id = 0;
    }

    addLigne(ligne: Ligne): void {
        this.lignes.push(ligne);
        this.formatLigneToInfo(ligne);
        this.prixTotal += ligne.prixLigne;
    }

    formatLigneToInfo(ligne: Ligne): void {
        this.infos += "[" + ligne.article.id + "-" + 
        ligne.quantite + "]/";  
    }
}
