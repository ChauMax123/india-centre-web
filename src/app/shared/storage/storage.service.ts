export abstract class StorageService {
    public abstract get<T>(key: string): T | undefined;

    public abstract set<T>(key: string, value: T): void;

    public abstract getStorage(): Storage;

    public abstract getRaw(key: string): string | undefined;

}
