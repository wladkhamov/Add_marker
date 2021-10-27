import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceNameService {

  constructor(private http: HttpClient) {

}
  get(lat: number, lng: number): any {
  return this.http.get('https://api.opencagedata.com/geocode/v1/json?q='+lat+ '+' +lng+'&key=AIzaSyDxz6K4zltIB44FFrTg_A_wWrqe4KLX4V0&pretty=1')
  }

}

