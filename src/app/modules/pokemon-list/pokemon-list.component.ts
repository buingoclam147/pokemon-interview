import { AsyncPipe, NgFor, NgIf, NgOptimizedImage, PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { catchError, delay, exhaustMap, finalize, map, of, startWith, tap } from 'rxjs';
import { PAGE_SIZE_OPTION } from '../../core/constants/table.const';
import { IDataPokemonListDto, IRequestList, TKeyOfItemPokemonDto } from '../../core/models/pokemon.model';
import { PokemonService } from '../../core/services/pokemon.service';
import { SpinService } from '../../core/services/spin.service';
import { patchableSignal } from '../../core/services/utils/common.function';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

const LIST_SORT: { value: TKeyOfItemPokemonDto, label: string }[] = [
  { value: 'total', label: 'Tổng' },
  { value: 'hp', label: 'Máu' },
  { value: 'attack', label: 'Tấn công' },
  { value: 'defense', label: 'Phòng thủ' },
  { value: 'sp_atk', label: 'Tấn công đặc biệt' },
  { value: 'sp_def', label: 'Phòng thủ đặc biệt' },
  { value: 'speed', label: 'Tốc độ' },
]

const SORT_BY_OPTIONS: { value: string, label: string }[] = [
  { value: '', label: 'Từ trên xuống dưới' },
  { value: '-', label: 'Từ dưới lên trên' }
]

const FILTER_DEFAULT: IRequestList & { sortBy: string } = { 'page[size]': 10, 'page[number]': 1, sort: '', sortBy: '' };
@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [NgIf, FormsModule, AsyncPipe, NgFor, FormsModule, RouterModule, ModalComponent, NgOptimizedImage, PokemonDetailComponent],
  providers: [
    { provide: PRECONNECT_CHECK_BLOCKLIST, useValue: ['https://api.vandvietnam.com'] }
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  private readonly pokemonSvc = inject(PokemonService);
  private readonly ss = inject(SpinService)
  readonly filter = patchableSignal(FILTER_DEFAULT);
  readonly dataPokemons = signal<IDataPokemonListDto | null>(null);
  readonly isLoading = signal(true);

  readonly listSort = LIST_SORT
  readonly sortByOptions = SORT_BY_OPTIONS
  readonly pageSizeOption = PAGE_SIZE_OPTION

  idModal: string | null = null

  readonly pokemons$ = toObservable(this.filter).pipe(
    tap(() => {
      this.isLoading.set(true);
    }),
    map((filter) => {
      const { sortBy, sort, ...req } = filter;
      return { ...req, sort: filter.sort && `${filter.sortBy}${filter.sort}` }
    }),
    exhaustMap((request: IRequestList) =>
      this.pokemonSvc.getListPokemons$(request)
        .pipe(
          delay(1000),
          tap((response) => this.dataPokemons.set(response)),
          finalize(() => this.isLoading.set(false)),
          catchError(() => {
            this.dataPokemons.set(null);
            return of(null)
          }),
          startWith({ data: [], links: null, meta: null, status: 0, success: false }),
          this.ss.spinningPageWithObs$()
        )
    )
  );

  onChangeSort(sort: TKeyOfItemPokemonDto) {
    this.filter.patch({ sort });
  }

  onChangeSortBy(sortBy: string) {
    this.filter.patch({ sortBy });
  }

  changePageIndex(pageIndex: number) {
    if (pageIndex < 1) return;
    this.filter.patch({ 'page[number]': pageIndex });
  }

  onChangePageSize(pageSize: number) {
    this.filter.patch({ 'page[size]': pageSize });
  }
}
