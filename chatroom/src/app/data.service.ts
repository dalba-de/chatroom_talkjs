import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  SharedData: string;

  SharedImage: string;

  public async retrieveData(): Promise<string> {
    return  this.SharedData;
  }

  public async retrieveImage(): Promise<string> {
    return  this.SharedImage;
  }

  constructor() { }
}
