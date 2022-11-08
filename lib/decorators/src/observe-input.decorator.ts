import { BehaviorSubject, Observable } from 'rxjs';

export const observeInput = <Data = any>(
  target: Function,
  providedKey: string
): Observable<Data> => {
  const obs$ = new BehaviorSubject<any | null>(null);
  const descriptor = Object.getOwnPropertyDescriptor(target, providedKey);

  Object.defineProperty(target, providedKey, {
    set(value: any) {
      obs$.next(value);
      if (descriptor?.set) descriptor.set(value);
    },
    get() {
      if (descriptor?.get) return descriptor.get();
      return obs$.value;
    },
  });

  return obs$.asObservable();
};

export function ObserveInput(providedKey?: string | null) {
  return function (target: any, key: string) {
    if (providedKey) {
      const obs$ = observeInput(target, providedKey);
      Object.defineProperty(target, key, {
        get() {
          return obs$;
        },
      });
    } else if (key.endsWith('$')) {
      const inferredKey = key.slice(0, key.lastIndexOf('$'));
      const obs$ = observeInput(target, inferredKey);
      Object.defineProperty(target, key, {
        get() {
          return obs$;
        },
      });
    } else {
      throw new Error("ObserveInput wasn't able to identify the input target.");
    }
  };
}
