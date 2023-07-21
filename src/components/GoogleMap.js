import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    padding: '40px', 
    height: '400px', 
    width: '620px',
  };
const defaultCenter = {
  lat: -19.8829524,
  lng: -43.9786782,
};
const options = {
  zoomControl: true,
};

function GoogleMapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onDragEnd = (e) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    mapRef.current.panTo(newPosition);
  };

  const onInputChange = (type, value) => {
    setMarkerPosition(prev => ({...prev, [type]: parseFloat(value)}));
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div style={{ padding: '40px', height: '400px', width: '700px'}}>
      <div style={{paddingBottom: '16px'}}>
        <label for="lat" style={{minWidth: "300px"}}>Latitude: </label>
        <input 
          id="lat"
          type="text" 
          value={markerPosition.lat} 
          onChange={(e) => onInputChange('lat', e.target.value)} 
        />
        <br/>
        <label for="lng">Longitude: </label>
        <input 
          id="lng" 
          type="text" 
          value={markerPosition.lng} 
          onChange={(e) => onInputChange('lng', e.target.value)} 
        />
      </div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={defaultCenter}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker 
          position={markerPosition} 
          draggable={true} 
          onDragEnd={onDragEnd}
        />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapComponent;
