import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { exhaustMap, filter, finalize, of, startWith, tap } from 'rxjs';
import { IDetailPokemonDto } from '../../../core/models/pokemon.model';
import { PokemonService } from '../../../core/services/pokemon.service';

@Component({
  selector: 'pokemon-detail[id]',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  private readonly pokemonSvc = inject(PokemonService)
  @Input({ required: true }) id!: string;
  dataPokemon = signal<IDetailPokemonDto | null>(null);
  isLoading = signal(true);
  readonly pokemons$ =
    of(null).pipe(
      filter(() => !!this.id),
      exhaustMap(_ => this.pokemonSvc.getPokemonById$(this.id)
        .pipe(
          // delay(1000),
          tap((response) => this.dataPokemon.set(response)),
          finalize(() => this.isLoading.set(false)),
          startWith({
            data: {
              id: '',
              number: 0,
              name: '',
              type_1: 0,
              type_2: null,
              total: 0,
              hp: 0,
              attack: 0,
              defense: 0,
              sp_atk: 0,
              sp_def: 0,
              speed: 0,
              generation: 0,
              legendary: 0,
              created_at: '',
              updated_at: ''
            }, status: 0, success: false
          })
        ))
    )
}
