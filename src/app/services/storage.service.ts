import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage, ) {
    this.init();
  }

  init(){
    this.storage.create();
  }
  async set(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  async getAllValues(): Promise<any> {
    const keys = await this.storage.keys();
    const allValues = await Promise.all(keys.map((key) => this.storage.get(key)));
    return allValues;
  }

  async getAllKeys(): Promise<string[]> {
    const keys = await this.storage.keys();
    return keys;
  }
  async get(key: string): Promise<WeatherData | null> {
    const value = await this.storage.get(key);
    return value;
  }
    
  async remove(key: string): Promise<void> {
    await this.storage.remove(key);
  }

  async clear(): Promise<void> {
    await this.storage.clear();
  } 
}
