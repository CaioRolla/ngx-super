import { BehaviorSubject } from 'rxjs';

export function ObserveInput(providedKey?: string | null) {
  const obs$ = new BehaviorSubject<any | null>(null);

  return function (target: any, key: string) {
    if (providedKey) {
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

      Object.defineProperty(target, key, {
        get() {
          return obs$.asObservable();
        },
      });
    } else if (key.endsWith('$')) {
      const inferredKey = key.slice(0, key.lastIndexOf('$'));
      const descriptor = Object.getOwnPropertyDescriptor(target, inferredKey);

      Object.defineProperty(target, inferredKey, {
        set(value: any) {
          obs$.next(value);
          if (descriptor?.set) descriptor.set(value);
        },
        get() {
          if (descriptor?.get) return descriptor.get();
          return obs$.value;
        },
      });

      Object.defineProperty(target, key, {
        get() {
          return obs$.asObservable();
        },
      });
    } else {
      Object.defineProperty(target, key, {
        set(value: any) {
          return obs$.next(value);
        },
        get() {
          return obs$.asObservable();
        },
      });
    }
  };
}
