import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public age = 10;
  constructor() {}
  public increaseAge() {
    this.age++;
    console.log(this.age);
  }
}
