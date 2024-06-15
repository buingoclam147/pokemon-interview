import { AsyncPipe, NgFor, NgIf, NgOptimizedImage, PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { catchError, delay, exhaustMap, map, of, startWith, tap } from 'rxjs';
import { PAGE_SIZE_OPTION } from '../../core/constants/table.const';
import { IDataPokemonListDto, IRequestList, TKeyOfItemPokemonDto } from '../../core/models/pokemon.model';
import { PokemonService } from '../../core/services/pokemon.service';
import { SpinService } from '../../core/services/spin.service';
import { patchableSignal } from '../../core/services/utils/common.function';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

const LIST_SORT: { value: TKeyOfItemPokemonDto, label: string }[] = [
  { value: 'number', label: 'Số thứ tự' },
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

const TYPE_OF_POKEMON = [
  { value: 0, label: 'Hệ bình thường' },
  { value: 1, label: 'Hệ lửa' },
  { value: 2, label: 'Hệ nước' },
  { value: 3, label: 'Hệ cỏ' },
  { value: 4, label: 'Hệ điện' },
  { value: 5, label: 'Hệ băng' },
  { value: 6, label: 'Hệ chiến đấu' },
  { value: 7, label: 'Hệ độc' },
  { value: 8, label: 'Hệ đất' },
  { value: 9, label: 'Hệ bay' },
  { value: 10, label: 'Hệ tâm linh' },
  { value: 11, label: 'Hệ côn trùng' },
  { value: 12, label: 'Hệ đá' },
  { value: 13, label: 'Hệ ma' },
  { value: 14, label: 'Hệ bóng tối' },
  { value: 15, label: 'Hệ rồng' },
  { value: 16, label: 'Hệ thép' },
  { value: 17, label: 'Hệ tiên' },
]

const FILTER_DEFAULT: IRequestList & { sortBy: string } = { 'page[size]': 10, 'page[number]': 1, sort: 'number', sortBy: '', 'filter[type]': '' };
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

  readonly listSort = LIST_SORT
  readonly sortByOptions = SORT_BY_OPTIONS
  readonly pageSizeOption = PAGE_SIZE_OPTION
  readonly typeOfPokemon = TYPE_OF_POKEMON
  idModal: string | null = null

  readonly pokemons$ = toObservable(this.filter).pipe(

    map((filter) => {
      const { sortBy, sort, ...req } = filter;
      return { ...req, sort: filter.sort && `${filter.sortBy}${filter.sort}` }
    }),
    exhaustMap((request: IRequestList) =>
      this.pokemonSvc.getListPokemons$(request)
        .pipe(
          delay(1000),
          tap((response) => this.dataPokemons.set(response)),
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

  onChangeFilterType(type: number | string) {
    this.filter.patch({ 'filter[type]': type === '' ? '' : +type + '' });
  }
}
