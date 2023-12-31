import { filtrosSaidas } from "src/model/config/filtrosSaidas";
import { ItemListaEntradaApi } from "src/model/general/item-lista-entrada-api";
import { ItemListaSaidaApi } from "src/model/general/item-lista-saida-api";

export interface IItemListaSaida{
    firstLoad: boolean,
    isLoading: boolean,
    data: ItemListaSaidaApi[],
    mesAnoCarregados: string[],
    filtroGeral: filtrosSaidas
}

export interface IItemListaEntrada{
    firstLoad: boolean,
    isLoading: boolean,
    mesAnoCarregados: string[],
    data: ItemListaEntradaApi[]
}