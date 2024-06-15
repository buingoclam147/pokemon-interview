import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, signal, ViewEncapsulation } from '@angular/core';
import { IDetailPokemonDto } from '@core/models/pokemon.model';
import { PokemonService } from '@core/services/pokemon.service';
import { SpinService } from '@core/services/spin.service';
import { delay, exhaustMap, filter, of, startWith, tap } from 'rxjs';
const DATA_DEFAULT = {
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
}
@Component({
  selector: 'pokemon-detail[id]',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PokemonDetailComponent {
  private readonly pokemonSvc = inject(PokemonService);
  private readonly ss = inject(SpinService);
  @Input({ required: true }) id!: string;
  dataPokemon = signal<IDetailPokemonDto | null>(null);
  readonly pokemons$ =
    of(null).pipe(
      filter(() => !!this.id),
      exhaustMap(_ => this.pokemonSvc.getPokemonById$(this.id)
        .pipe(
          delay(1000),
          tap((response) => this.dataPokemon.set(response)),
          this.ss.spinningPageWithObs$(),
          startWith(DATA_DEFAULT)
        ))
    )
}
