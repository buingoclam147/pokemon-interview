import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, defer, finalize, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading$.asObservable();

  setLoading(value: boolean) {
    this._loading$.next(value);
  }

  public spinningPageWithObs$<T>(): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> =>
      source.pipe(
        prepare(() => {
          Promise.resolve().then(() => this._loading$.next(true));
        }),
        catchError((err) => {
          Promise.resolve().then(() => this._loading$.next(false));
          return of(err);
        }),
        finalize(() => {
          Promise.resolve().then(() => this._loading$.next(false));
        })
      );
  }

}
export function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T | any> {
  return (source: Observable<T>): Observable<T> => defer(() => {
    callback();
    return source;
  });
}

