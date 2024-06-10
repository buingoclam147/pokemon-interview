import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataPokemonListDto, IRequestList } from './models/pokemon.model';
import { covertQueryParams } from './utils/common.function';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient)
  private readonly api = 'https://api.vandvietnam.com/api/pokemon-api/pokemons'
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';


  getListPokemons(request: IRequestList): Observable<IDataPokemonListDto> {
    return this.http.get<IDataPokemonListDto>(`${this.api}${covertQueryParams(request)}`);
  }

  // getPokemonById(id: number): Observable<Pokemon> {
  //   return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  // }
}
