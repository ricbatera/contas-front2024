import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Devedor } from 'src/model/general/devedor';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  API_URL = environment.URLSERVIDOR;
  constructor(private httpClient: HttpClient) { }
   // Headers
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getDevedoresFull(): Observable<Devedor[]> {
    return this.httpClient.get<Devedor[]>(`${this.API_URL}cadastros/devedor/listar-devedores`);
  }


    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
      console.log(error)
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    };
}
