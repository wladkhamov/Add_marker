import { identifierModuleUrl, SelectorMatcher } from '@angular/compiler';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';
import { Injectable } from '@angular/core';
import { ServiceNameService } from './service-name.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Test1';
  @ViewChild("map", {static: true} ) mapElement: any;
  map: google.maps.Map;
  latitude: any = 54.9553775;
  longitude: any = 82.9969769;
  info = {lat:54.9553775, lng:82.9969769, city: "", country: "", suburb:""};
  marker: any;




  ngAfterViewInit(){
  this.loadMap();

  }

loadMap(){
  let latLng = new google.maps.LatLng(
    this.latitude, this.longitude
  );

  let mapOptions = {
    center: latLng,
    zoom: 9,
    mapTypeId: google.maps.MapTypeId.ROADMAP

  };
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);



  google.maps.event.addListener(this.map, "click", (event) => {
    this.addMarker(event.latLng, this.map);

  });

}
addMarker(location:any, map:any) {

  this.info.lat = location.lat();
  this.info.lng = location.lng();
  this.ngOnInit();
  if (this.marker) {
    this.marker.setPosition(location)
    return;
  }
  this.marker = new google.maps.Marker({
        position: location,
        map: map

      });

}
saveMarker(){
  let pointes = [this.info.lat, this.info.lng]
  if(localStorage.getItem('Координаты') == null){
    localStorage.setItem('Координаты', '[]')
  }
  var old_data = JSON.parse(localStorage.getItem('Координаты'));
  old_data.push(pointes);
  localStorage.setItem('Координаты', JSON.stringify(old_data));
}

clear(){
  localStorage.clear();
}
  ngOnInit(){
    this._modalS.get(this.info.lat, this.info.lng).subscribe((response: any)=>{response = response;
    console.log(response)
    this.info.country=response.results[0].components.country;
    this.info.city=response.results[0].components.state;
    this.info.suburb=response.results[0].components.suburb;
    console.log(this.info.country, this.info.city,this.info.suburb);
    })
  }
  constructor(private _modalS: ServiceNameService) {}
}
