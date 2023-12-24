import { ItemListaSaidaApi } from "src/model/general/item-lista-saida-api";

export interface IItemListaSaida{
    firstLoad: boolean,
    isLoading: boolean,
    data: ItemListaSaidaApi[],
    mesAnoCarregados: string[]
}