import { Signal, WritableSignal } from "@angular/core";

export type PatchableSignal<T extends {}> = Signal<T> & WritableSignal<T> &
{
  /** Updates properties on an object */
  patch(value: Partial<T>): void;
};
