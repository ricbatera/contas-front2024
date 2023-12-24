import { MesAno } from "src/model/config/mes-ano";

export interface IFiltrosState{
    firstLoad: boolean,
    mesAno:MesAno,
    devedorId: number,
    status: string,
    tagId:number
    anosSaidaLoaded:[],
    mesesSaidaLoaded:[],
    anosEntradaLoaded:[],
    mesesEntradaLoaded:[]
}

export interface IMenuSelected {
    nome: string,
    tabDefault: number,
    configs: {
        titulo: string,
        menus:[]
    }
}