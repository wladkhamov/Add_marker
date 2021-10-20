import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceNameService {

  constructor(private http: HttpClient) {

}
  get(lat: number, lng: number): any {
  return this.http.get('https://api.opencagedata.com/geocode/v1/json?q='+lat+ '+' +lng+'&key=be6a1e21cd134491aaab4f29e4a84907&pretty=1')
  }

}

