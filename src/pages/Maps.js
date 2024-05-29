import { MapContainer, useMap, useMapEvents , TileLayer, Marker, Popup} from 'react-leaflet';
// import { Control } from 'react-leaflet-control';
import { Icon } from 'leaflet';


import React, {useState, useEffect } from "react";
import L from "leaflet";
import dataGares from "../data/referentiel-gares-voyageurs.json";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import marker1 from '../images/train.png';
import marker2 from '../images/marker.svg';

import rouge from '../images/rond_rouge.png';
import orange1 from '../images/rond_orange_1.png';
import orange2 from '../images/rond_orange_2.png';
import jaune1 from '../images/rond_jaune.png';
import jaune2 from '../images/rond_jaune_2.png';




//CSS
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "leaflet/dist/leaflet.css";
import "font-awesome/css/font-awesome.min.css";
let tmp = 1;
let jsonData;
let hashmapGare = new Map();
let filter = [];
const RangeSlider = () => {

  const [rangeval, setRangeval] = useState(null);
  tmp = rangeval * 60;

  if(rangeval == null) {
    return (
      <div>
        <br></br>
        <input id="slider" type="range" className="custom-range" min="1" max="10" step="1" defaultValue="1"
         onChange={(event) => setRangeval(event.target.value)} />
        <h4>Temps : {rangeval}</h4>
      </div>
      )
  } else {
    return (
      <div>
        <br></br>
        <input id="slider" type="range" className="custom-range" min="1" max="10" step="1" defaultValue="1"
         onChange={(event) => setRangeval(event.target.value)} />
        <h4>Temps : {rangeval} heure(s)</h4>
      </div>
      )
  }
};

const iconBasic = new Icon({
 iconUrl: marker1,
 iconSize: [32,32],
});

const iconLocation = new Icon({
  iconUrl: marker2,
  iconSize: [32,32]
 });


 const iconRouge = new Icon({
  iconUrl: rouge,
  iconSize: [16,16],
 });

 const iconOrange1 = new Icon({
  iconUrl: orange1,
  iconSize: [16,16]
 });

 const iconOrange2 = new Icon({
  iconUrl: orange2,
  iconSize: [16,16]
 });

 const iconJaune1 = new Icon({
  iconUrl: jaune1,
  iconSize: [16,16]
 });

 const iconJaune2 = new Icon({
  iconUrl: jaune2,
  iconSize: [16,16]
 });



const center = [47.145642247997316, 2.793386115987655];

const filterGare1 = dataGares.filter(
  (gare) => gare.fields.segmentdrg_libelle === "a"
);

const filterGare2 = dataGares.filter(
  (gare) =>
    (gare.fields.segmentdrg_libelle === "a" ||
    gare.fields.segmentdrg_libelle === "b") &&
    gare.fields.longitude_entreeprincipale_wgs84 !== undefined
);

const filterGare3 = dataGares.filter(
  (gare) =>
    (gare.fields.segmentdrg_libelle === "a" ||
    gare.fields.segmentdrg_libelle === "b" ||
    gare.fields.segmentdrg_libelle === "c") &&
    gare.fields.longitude_entreeprincipale_wgs84 !== undefined
);


async function getGareUser(gare, forceUpdate) {
  try {
    if (tmp === 0){
      tmp = 60;
    }
    hashmapGare = new Map();
    const response = await fetch(`http://localhost:5000/train/${gare}/${tmp}`);
    jsonData = await response.json();
    console.log(jsonData);
    for (const e of jsonData) {
      hashmapGare.set(e.goal.toString(), e.time)
    }
    
} catch (err){
    console.error(err.message);
} 
  forceUpdate();
  return null;
}



function marker (filt, forceUpdate){
  const map = filt.map(e => (
    <Marker
      key={e.fields.uic_code}
      position={[e.fields.latitude_entreeprincipale_wgs84, e.fields.longitude_entreeprincipale_wgs84]}
      icon = {iconBasic} 
      >
      <Popup>
        <h3> {"Gare : " + e.fields.gare_alias_libelle_noncontraint} </h3>
        <RangeSlider></RangeSlider>
        <button onClick={() => getGareUser(e.fields.uic_code.slice(-8), forceUpdate)}> Valider </button>
      </Popup>
  </Marker>
  ));

  return map;
}

function markerRecherche(forceUpdate){
  for (const it of dataGares) {
    if (hashmapGare.has(it.fields.uic_code.slice(-8).toString()) && it.fields.longitude_entreeprincipale_wgs84 !== undefined){
      filter.push(it);
    }
  }
  const mapR = filter.map(e => (
    <Marker
      key={e.fields.uic_code}
      position={[e.fields.latitude_entreeprincipale_wgs84, e.fields.longitude_entreeprincipale_wgs84]}
      opacity = {0.5}
      icon = {getMarkerIcon(e.fields.uic_code)}
    >
      <Popup>
        <h3> {"Gare : " + e.fields.gare_alias_libelle_noncontraint} </h3>
        <RangeSlider></RangeSlider>
        <button onClick={() => getGareUser(e.fields.uic_code.slice(-8), forceUpdate)}> Valider </button>
      </Popup>
    </Marker>
  ));
  filter = [];
  return mapR;
}

function getMarkerIcon(e){
  if(hashmapGare.get(e.slice(-8)) < (tmp/5)){
    return iconRouge;
  } else if(hashmapGare.get(e.slice(-8)) < (tmp*2/5)) {
    return iconOrange1;
  } else if(hashmapGare.get(e.slice(-8)) < (tmp*3/5)) {
    return iconOrange2;
  }else if(hashmapGare.get(e.slice(-8)) < (tmp*4/5)) {
    return iconJaune1;
  } else {
    return iconJaune2;
  }
}

const ZoomTracker = ({ setZoom }) => {
  const map = useMapEvents({
    zoom(){
      setZoom(map.getZoom())
    }
  })
  return null
}

const ZoomControlledLayer = ({ zoom , forceUpdate }) => {
  let ret = null;
  if( hashmapGare.size === 0){
    if (zoom <= 9){
      console.log("niveau 1");
      ret = marker(filterGare1, forceUpdate );
    } else if (zoom >= 10 && zoom <= 12){
      console.log("niveau 2");
      ret = marker(filterGare2, forceUpdate);
    }else if (zoom >= 13){
      console.log("niveau 3");
      ret = marker(filterGare3, forceUpdate);
    } else{
      console.log("Aucun niveau");
      ret = marker(filterGare1, forceUpdate);
    }
  } else {
    ret = markerRecherche(forceUpdate);
  }
  return (ret);
}

function LeafletgeoSearch() {
  const map = useMap(); //here use useMap hook

  useEffect(() => {

    const provider = new OpenStreetMapProvider({
      params: {
      'accept-language': 'fr', // Nom des villes en français
      countrycodes: 'fr', // Limite les recherches à la France seulement
    },
  });

    const searchControl = new GeoSearchControl({
      notFoundMessage: 'Désolé, cette adresse est introuvable.',
      provider,
      marker: {icon : iconLocation}
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl)
  }, []);

  return null;
}


export default function Maps(){

  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!map) return;
    L.easyButton("fa-map-marker", () => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 14);
      });
    }).addTo(map);
  }, [map]);

  useEffect(() => {
    if (!map) return;
    L.easyButton('fa fa-refresh', () => {
      window.location.reload();
    }).addTo(map);
  }, [map]);


  const [zoom, setZoom] = useState()

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <>
    <MapContainer 
    center={center}
    className ="map"
    zoom={6}
    whenCreated={setMap}
    style={{ height: "88.6vh" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=F4ZxF5g8ioWE3GlTx3i0#-0.2/0.00000/76.51878"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <ZoomTracker setZoom={setZoom} />
      <ZoomControlledLayer zoom={zoom} forceUpdate={forceUpdate}>
      </ZoomControlledLayer>
      <LeafletgeoSearch provider={new OpenStreetMapProvider()} />
    </MapContainer>
    </>
  )

}