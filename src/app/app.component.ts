import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';


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
  info = {lat:undefined, lng:undefined};
  marker: any;



  ngOnInit(){}
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

  if (this.marker) {
    this.marker.setPosition(location)
    return;
  }
  this.marker = new google.maps.Marker({
        position: location,
        map: map
      });


}

}

