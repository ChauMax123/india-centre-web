import { Injectable } from '@angular/core';

export type RawStorageKeys = 'access_token';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    private get nativeWindow(): Storage {
    return window.localStorage;
  }

  // Get item from localStorage and parse as JSON if it's an object, or return the raw string if it's a token.
  public get<T>(key: string): T | undefined {
    const content = this.nativeWindow.getItem(key);
    if (content) {
      try {
        return JSON.parse(content);
      } catch (error) {
        return content as T;
      }
    }
    return undefined;
  }


  public set<T>(key: string, value: T): void {
    this.nativeWindow.setItem(key, JSON.stringify(value));
  }

  public getStorage(): Storage {
    return this.nativeWindow;
  }


  public getRaw(key: RawStorageKeys): string | undefined {
    return this.nativeWindow.getItem(key)??undefined;
  }
}
