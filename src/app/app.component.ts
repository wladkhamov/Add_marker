import { identifierModuleUrl, jsDocComment, LocalizedString, SelectorMatcher, ThrowStmt } from '@angular/compiler';
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
  old_data: any;
  arrayKoord: any;
  infowindow: any;
  contentString: any;
  poly: any;






ngAfterViewInit(){this.loadMap();}

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
  this.infowindow = new google.maps.InfoWindow({
    content: this.contentString
  });

}

addMarker(location:any, map:any) {
  this.ClearPoly();
  this.info.lat = location.lat();
  this.info.lng = location.lng();
  this.ngOnInit();
  this.markerSetInfoPosition(location, map)

  this.contentString ='<h1>'+this.info.country+'</<h1><h2>'+this.info.city+'</<h2>';
  this.infowindow.setContent(this.contentString)
  this.marker.addListener('click', ()=> {
  this.infowindow.open(this.map, this.marker);
});
  this.infowindow.addListener('closeclick', ()=>{
  this.infowindow.close()
});
}

markerSetInfoPosition(location:any, map:any){
  if (this.marker) {
    this.marker.setPosition(location)
    return;
  }
  this.marker = new google.maps.Marker({
        position: location,
        map: this.map
      });
}

saveMarker(){
  let pointes = [this.info.lat, this.info.lng] // последний поставленный
  if(localStorage.getItem('Координаты') == null){
    localStorage.setItem('Координаты', '[]')
  }
  this.old_data = JSON.parse(localStorage.getItem('Координаты')); // старые данные хранилища
  this.old_data.push(pointes);
  localStorage.setItem('Координаты', JSON.stringify(this.old_data));
}

MoveMarker(){
  const flightPlanCoordinates = [

  ];
    this.poly = new google.maps.Polyline({

    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  this.poly.setMap(this.map);
  let arrayAll = JSON.parse(localStorage.getItem('Координаты'))
  var arrayFromStroage = JSON.parse(localStorage.getItem("Координаты"));
  var arrayLength = arrayFromStroage.length;

  for (var i =0; i<arrayLength; i++){

    ((i) =>{
      setTimeout(() =>  {

        this.arrayKoord=arrayAll[i];
        this.info.lat =this.arrayKoord[0];
        this.info.lng = this.arrayKoord[1];
        this.markerSetInfoPosition({lat: this.info.lat, lng: this.info.lng}, this.map)
        this.ngOnInit();
        const path = this.poly.getPath();
        console.log(path)

          path.push(new google.maps.LatLng(this.info.lat,this.info.lng))

      }, i*1500)
    })(i);

  }
}
clear(){
  localStorage.clear();
}
ClearPoly(){
  this.poly.setMap(null)
}
  ngOnInit(){

    this._modalS.get(this.info.lat, this.info.lng).subscribe((response: any)=>{response = response;
    /*console.log(response)*/
    this.info.country=response.results[0].components.country;
    this.info.city=response.results[0].components.state;
    this.info.suburb=response.results[0].components.suburb;
    /*console.log(this.info.country, this.info.city,this.info.suburb);*/
    })
  }
  constructor(private _modalS: ServiceNameService) {}
}
