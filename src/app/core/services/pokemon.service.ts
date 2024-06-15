import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataPokemonListDto, IDetailPokemonDto, IRequestList } from '../models/pokemon.model';
import { covertQueryParams } from './utils/common.function';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient)
  private readonly api = 'https://api.vandvietnam.com/api/pokemon-api/pokemons'

  getListPokemons$(request: IRequestList): Observable<IDataPokemonListDto> {
    return this.http.get<IDataPokemonListDto>(`${this.api}${covertQueryParams({ ...request })}`)
  }

  getPokemonById$(id: string): Observable<IDetailPokemonDto> {
    return this.http.get<IDetailPokemonDto>(`${this.api}/${id}`);
  }
}
