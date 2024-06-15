import { ITableRequestBase } from "./table.model";

export interface IDataPokemonListDto {
  data: IItemPokemonDto[];
  links: ILinkDto;
  meta: IDataMetaDto;
  status: number;
  success: boolean;
}

interface IDataMetaDto {
  per_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
  last_page: number;
  path: string;
}

interface ILinkDto {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface IItemPokemonDto {
  id: string;
  number: number;
  name: string;
  type_1: number;
  type_2: null | number;
  total: number;
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
  generation: number;
  legendary: number;
  created_at: string;
  updated_at: string;
}
export type TKeyOfItemPokemonDto = keyof IItemPokemonDto;
export interface IRequestList extends ITableRequestBase {
  sort: string;
  'filter[type]': string | null | number;
}

export interface IDetailPokemonDto {
  data: IItemPokemonDto;
  status: number;
  success: boolean;
}
