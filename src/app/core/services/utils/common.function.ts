import { CreateSignalOptions, signal, WritableSignal } from "@angular/core";
import { SignalGetter } from "@angular/core/primitives/signals";
import { PatchableSignal } from "../../models/common.model";

const covertQueryParams = <T>(obj: T): string => {
  return (
    '?' +
    new URLSearchParams(
      obj as string | string[][] | Record<string, string> | URLSearchParams
    ).toString()
  );
};

const formatPageToRequest = (pageIndex: number, pageSize: number) => {
  return {
    'page[number]': pageIndex,
    'page[size]': pageSize
  };
}

const patchableSignal = <T extends {}>(initialValue: T, options?: CreateSignalOptions<T>): PatchableSignal<T> => {
  const internal = signal<T>(initialValue) as SignalGetter<T> & WritableSignal<T>;
  return Object.assign(internal, {
    patch: (value: Partial<T>) => internal.update(x => ({ ...x, ...value })),
  });
}

export {
  covertQueryParams, formatPageToRequest, patchableSignal
};

