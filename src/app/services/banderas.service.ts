import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanderasService {

  private apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags';
  

  constructor(private httpClient:HttpClient) { }



  // Obtener todos los países
  TraerPaises(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl).pipe(map(paises=>paises));
    
  }


}
