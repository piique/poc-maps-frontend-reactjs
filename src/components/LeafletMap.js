import { useRef, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const config = {
  recenterAfterMove: true,
  fixZoomAfterMove: false,
  zoom: 16,
  center: {
    lat: -19.8829524,
    lng: -43.9786782,
  },
}

function DraggableMarker({position, setPosition}) {
  const [draggable, setDraggable] = useState(true)
  const markerRef = useRef(null)
  const map = useMap(); // Use this hook to get the map instance

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition)
          console.log(newPosition)
          if(config.fixZoomAfterMove) map.setZoom(config.zoom); // Update map zoom when marker is dragged
          if(config.recenterAfterMove) map.flyTo(newPosition); // Update map center when marker is dragged
        }
      },
    }),
    [map], // Add map as dependency
  )

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
    </Marker>
  )
}

function LeafletMap() {
  const [position, setPosition] = useState(config.center)

  return (
    <div style={{ padding: '40px', height: '400px', width: '700px'}}>
      <div style={{paddingBottom: '16px'}}>
        <label for="lat" style={{minWidth: "300px"}}>Latitude: </label>
        <input id="lat" type="text" value={position.lat} onChange={(e) => setPosition({ ...position, lat: parseFloat(e.target.value) })} />
        <br/>
        <label for="lng">Longitude: </label>
        <input id="lng" type="text" value={position.lng} onChange={(e) => setPosition({ ...position, lng: parseFloat(e.target.value) })} />
      </div>
      <MapContainer 
        center={config.center} 
        zoom={config.zoom} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" /> */}
        {/* <TileLayer url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" /> */}
        {/* <TileLayer url="http://c.sm.mapstack.stamen.com/toner-hybrid/{z}/{x}/{y}.png" /> */}
        <DraggableMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
