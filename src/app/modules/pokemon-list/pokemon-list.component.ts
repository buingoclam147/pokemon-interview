import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { exhaustMap, finalize, map, tap } from 'rxjs';
import { IItemPokemonDto, TKeyOfItemPokemonDto } from '../../core/services/models/pokemon.model';
import { PokemonService } from '../../core/services/pokemon.service';
import { patchableSignal } from '../../core/services/utils/common.function';


@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [NgIf, FormsModule, AsyncPipe, NgFor, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  private readonly pokemonSvc = inject(PokemonService)
  readonly filter = patchableSignal({ 'page[size]': 10, 'page[number]': 1, sort: '', sortBy: '' });
  readonly listPokemons = signal<IItemPokemonDto[]>([]);
  readonly isLoading = signal(true);

  readonly listSort: { value: TKeyOfItemPokemonDto, label: string }[] = [
    { value: 'total', label: 'Tổng' },
    { value: 'hp', label: 'Máu' },
    { value: 'attack', label: 'Tấn công' },
    { value: 'defense', label: 'Phòng thủ' },
    { value: 'sp_atk', label: 'Tấn công đặc biệt' },
    { value: 'sp_def', label: 'Phòng thủ đặc biệt' },
    { value: 'speed', label: 'Tốc độ' },
  ]
  readonly sortByOptions = [
    { value: '', label: 'Từ trên xuống dưới' },
    { value: '-', label: 'Từ dưới lên trên' }
  ]

  pokemons$ = toObservable(this.filter).pipe(
    map((filter) => {
      const { sortBy, sort, ...req } = filter;
      return { ...req, sort: filter.sort && `${filter.sortBy}${filter.sort}` }
    }),
    exhaustMap((request) =>
      this.pokemonSvc.getListPokemons(request)
        .pipe(
          tap((response) => this.listPokemons.set(response.data)),
          finalize(() => this.isLoading.set(false))
        )
    )
  );

  onChangeSort(sort: TKeyOfItemPokemonDto) {
    this.filter.patch({ sort });
  }

  onChangeSortBy(sortBy: string) {
    this.filter.patch({ sortBy });
  }
}
