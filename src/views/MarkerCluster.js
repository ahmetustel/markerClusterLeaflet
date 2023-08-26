import React from 'react';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Card, CardBody } from "reactstrap";
import * as L from "leaflet";
import 'leaflet.markercluster';
import { MarkerMuster } from "react-leaflet-muster";

const MarkerCluster = () => {
  const [position, setPosition] = useState([39.8974032, 32.8162874]); // Başlangıç konumu
  const zoom = 13;

  const LeafIcon = L.Icon.extend({
    options: {},
  });
  const greenIcon = new LeafIcon({
    iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
    iconAnchor: [10, 30],
  });

  useEffect(() => {
    // Konum bilgisini
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error('Konum bilgisi alınamadı.', error);
      }
    );
  }, []);

  // Örnek marker verileri
  const points = [
    { position: [position[0] + 0.1, position[1] + 0.1] },
    { position: [position[0] + 0.2, position[1] + 0.2] },
    { position: [position[0] + 0.3, position[1] + 0.3] }
  ];

  return (
    <Card>
      <CardBody>
        <div style={{ height: "400px" }}>
          <MapContainer
            center={position}
            zoom={zoom}
            style={{ height: "100%" }} // Harita yüksekliğini yüzde olarak ayarlayın
            className="mb-2"
          >
            <TileLayer
              attribution='<a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* "MarkerMuster" sarmalı içineki Marker'ları cluster içerisinde toplar*/}
            <MarkerMuster>
              {points.map((point, index) => (
                <Marker
                  key={index}
                  position={point.position}
                  icon={greenIcon}
                >
                  <Popup
                  >Marker {index + 1}</Popup>
                </Marker>
              ))}
            </MarkerMuster>
          </MapContainer>
        </div>
      </CardBody>
    </Card>
  );
};
export default MarkerCluster;