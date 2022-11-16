import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Movie } from 'src/interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private storageReady = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    this.init();
   }

   private async init() {
    console.log('INIT')
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
    console.log('INIT DONE')
    this.storageReady.next(true);
  }

  public async set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    console.log('GET')
    return this.storageReady.pipe(
      filter(ready => ready),
      switchMap(_ => {
        return this._storage?.get(key);
      })
    );
    // return this._storage?.get(key);
  }

  public async remove(key){
    this._storage.remove(key);
  }

  public async clear(key){
    this._storage.clear();
  }

  

}
