import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import filtrosType from 'src/model/config/filtros-enum';
import { MesAno } from 'src/model/config/mes-ano';
import { getStateFull } from '../sistema/store/sistema..selectors';
import { IFiltrosState } from '../sistema/store/sistema.state';
import { loadListaSaidas } from '../sistema/EntradaSaidaModule/store/entradasSaidas.actions';
// import { ItemEntradaApi } from '../model/item-entrada-api';
// import { ItemListaSaidaApi } from '../model/item-lista-saida-api';
// import { filtrosEntradas } from '../sistema/sistema/entradas/lista-entradas/lista-entradas.component';
// import { filtros } from '../sistema/sistema/saidas/lista-saidas/lista-saidas.component';
// import { filtrosPesquisaMesAno } from '../sistema/store/sistema.actions';
// import { ParamMesAno } from '../model/filtroMesAno';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  filtrosState$!: IFiltrosState

  constructor(private store: Store) {
    this.store.select(getStateFull).subscribe(res=> this.filtrosState$ = res);
   }

  public filtrar(param: any, tipo: filtrosType, transacao: string) {
    switch (transacao) {
      case filtrosType.transacaoEntrada:
        console.log("IMPLEMNTAR O QUE FAZER QUANDO O FILTRO FOR UMA TRANSACAO DE ENTRADAS")
        break;
      case filtrosType.transacaoSaida:
        this.filtrosSaidas(param, tipo)
        break;
      default:
        console.log(`Filtros informados não mapeados. ${param} e/ou ${tipo}`);
        break;
    }

  }
  private filtrosSaidas(param: any, tipo: filtrosType) {
    switch (tipo) {
      case filtrosType.anoStart:
        this.validaAnoSaidaStart(param);
        break;

      default:
        break;
    }
  }

  private validaAnoSaidaStart(param: any){
    let cont = 0
    let mesStartAtual= this.filtrosState$.mesAno.mesStart
    let anoStartAtual = this.filtrosState$.mesAno.anoStart
    let mesEndtAtual = this.filtrosState$.mesAno.mesEnd
    let anoEndAtual = this.filtrosState$.mesAno.anoEnd

    console.log('aqui')
    this.validaMesAno(mesStartAtual, anoStartAtual);
    // varre a lista de anos já carregados
    this.filtrosState$?.anosSaidaLoaded.forEach(ano=>{
      if(ano == param) cont++
    });
    if(cont > 0){
      //filta a lista com os dados existentes

    }else{
      //carrega novos dados e adiciona na lista existente
      this.store.dispatch(loadListaSaidas({payload: this.filtrosState$?.mesAno}))
      //atualiza a lista de anos iniciais de Saida
    }
  }

  validaMesAno(mes:any, ano:any){
    let hoje = new Date();
    hoje.setMonth(mes);
    hoje.setFullYear(ano);
    console.log(hoje);
  }

  filtraDevedores(lista: any[]) {
    return lista
      .filter(v => v.devedorNome != null)
      .map(v => v.devedorNome)
      .filter((v, i, arr) => arr.indexOf(v) === i);
  }
  // filtraDevedoresEntrada(lista: ItemEntradaApi[]) {
  //   return lista
  //     .filter(v => v.devedor.nome != null)
  //     .map(v => v.devedor.nome)
  //     .filter((v, i, arr) => arr.indexOf(v) === i);
  // }

  // filtraMeioPagto(lista: any[]) {
  //   let result: any[] = lista
  //     .map(v => this.debitoOrCartao(v))
  //     .filter((v, i, arr) => arr.indexOf(v) === i);
  //     return result;
  // }

  filtaClassificacao(lista: any[]) {
    return lista
      .map(v => v.classificacaoNome)
      .filter((v, i, arr) => arr.indexOf(v) === i);
  }

  // filtaClassificacaoEntrada(lista: ItemEntradaApi[]){
  //   return lista
  //   .map(v=> v.classificacao.nome)
  //   .filter((v, i, arr) => arr.indexOf(v) === i);
  // }

  // filtrar(p: filtros, lista: ItemListaSaidaApi[]) {
  //   if (p.devedor != 'Todos') {
  //     lista = lista.filter(v => v.devedorNome == p.devedor)
  //   }

  //   if (p.meioPagto != 'Todos') {
  //     if (p.meioPagto == 'Débito / Boleto') {
  //       lista = lista.filter(v => v.saida.meioPagto == 'debito')
  //     } else {
  //       lista = lista.filter(v => v.fatura?.cartao?.nome == p.meioPagto)
  //     }
  //   }

  //   if (p.classificacao != 'Todas') {
  //     lista = lista.filter(v => v.classificacaoNome == p.classificacao)
  //   }

  //   return lista;
  // }

  // filtarEntrada(p: filtrosEntradas, lista:ItemEntradaApi[]){
  //   if(p.devedor != "Todos"){
  //     lista = lista.filter(v => v.devedor.nome == p.devedor)
  //   }
  //   if (p.classificacao != 'Todas') {
  //     lista = lista.filter(v => v.classificacao.nome == p.classificacao)
  //   }
  //   return lista;
  // }

  public defineMesAnoInicial() {
    //aqui vou definir a data inicial como hoje e data final daqui um ano
    let hoje = new Date();
    let anoInicial = hoje.getFullYear()
    let mesInicial = hoje.getMonth() + 1;

    let payload: MesAno = {
      mesStart: hoje.getMonth() + 1,
      anoStart: hoje.getFullYear(),
      mesEnd: hoje.getMonth() + 1,
      anoEnd: hoje.getFullYear() + 1,
    }
    return payload
    //this.store.dispatch(filtrosPesquisaMesAno({payload}));
  }

  capitalize(word: String) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // private debitoOrCartao(item: ItemListaSaidaApi) {
  //   if (item.fatura != null) {
  //     return item.fatura.cartao?.nome
  //   } else {
  //     return "Débito / Boleto"
  //   }
  // }
}

