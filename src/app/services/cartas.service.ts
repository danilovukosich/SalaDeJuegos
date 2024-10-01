import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private httpClient: HttpClient) { }

  //https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1    mazo normal
  //https://www.deckofcardsapi.com/api/deck/new/shuffle/?cards=2S,3S,4S,5S,6S,7S,8S,9S,0S,2D,3D,4D,5D,6D,7D,8D,9D,0D,2C,3C,4C,5C,6C,7C,8C,9C,0C,2H,3H,4H,5H,6H,7H,8H,9H,0H     //mazo numerico
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
