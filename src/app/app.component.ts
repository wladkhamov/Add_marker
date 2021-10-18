
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
    addMarker(event.latLng, this.map);

  });
  // Add a marker at the center of the map.
  addMarker(latLng, this.map);



  function addMarker(location:any, map:any) {

    var lat = location.lat();
    var lng = location.lng();
    var coordinates = lat+", "+lng;

    console.log(coordinates);
    new google.maps.Marker({
      position: location,
      map: map

    });
    let elementLT = document.querySelector('#Lt');
    elementLT!.innerHTML = lat;
    let elementLG = document.querySelector('#Lg');
    elementLG!.innerHTML = lng;
    console.log(coordinates);

  }

}




}

