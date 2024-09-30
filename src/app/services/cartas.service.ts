import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private httpClient: HttpClient) { }


  GetMazo():Observable<any>{
    return this.httpClient.get<any>('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .pipe(map(cartas=>cartas));
  }

  GetCarta(deckId:string):Observable<any>
  {
    return this.httpClient.get<any>('https://www.deckofcardsapi.com/api/deck/'+ deckId + '/draw/?count=1')
    .pipe(map(carta=>carta));
  }

}
