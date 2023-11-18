import { Devedor } from "src/model/general/devedor"

export interface IDevedorState{
    isLoading: boolean
    firstLoad:boolean
    devedores:Devedor[]
}