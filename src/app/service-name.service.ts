import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiceNameService {

  constructor(private http: HttpClient) {

}
  get(lat: number, lng: number): any {
  return this.http.get('https://api.opencagedata.com/geocode/v1/json?q='+lat+ '+' +lng+'&key=AIzaSyDNxReUFeJT0x0JskiM5kOFiDt1IZtMLCQ&pretty=1')
  }

}

