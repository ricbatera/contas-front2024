import { MesAno } from "src/model/config/mes-ano";

export interface IMesAnoState{
    firstLoad: boolean,
    mesAno:MesAno
}

export interface IMenuSelected {
    nome: string,
    tabDefault: number,
    configs: {
        titulo: string,
        menus:[]
    }
}