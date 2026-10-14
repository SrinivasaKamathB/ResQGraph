import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import ConfidenceBadge from './ConfidenceBadge';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const incidentIconHigh = createCustomIcon('#22c55e'); // green
const incidentIconMedium = createCustomIcon('#eab308'); // yellow
const incidentIconLow = createCustomIcon('#ef4444'); // red
const vehicleIcon = createCustomIcon('#3b82f6'); // blue

const MapView = ({ incidents = [], dispatchPlan = [] }) => {
  const center = [12.9716, 77.5946]; // Bengaluru
  
  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        className="bg-[#0a0f24]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {incidents.map((incident) => {
          let icon = incidentIconHigh;
          if (incident.confidence < 0.3) icon = incidentIconLow;
          else if (incident.confidence < 0.7) icon = incidentIconMedium;

          return (
            <Marker key={`inc-${incident.id}`} position={incident.location} icon={icon}>
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold text-gray-800">Incident #{incident.id}</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p><strong>Victims:</strong> {incident.victims}</p>
                    <p><strong>Risk Score:</strong> {incident.risk.toFixed(2)}</p>
                    <div className="mt-2">
                      <ConfidenceBadge score={incident.confidence} />
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {dispatchPlan && dispatchPlan.map((vehicle) => {
          const targetIncident = incidents.find(i => i.id === vehicle.target);
          
          return (
            <React.Fragment key={`veh-${vehicle.id}`}>
              <Marker position={vehicle.location} icon={vehicleIcon}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-gray-800">Rescue {vehicle.type} {vehicle.id}</h3>
                    <p className="text-sm text-gray-600 mt-1">En route to Incident #{vehicle.target}</p>
                    <p className="text-sm text-gray-600">ETA: {vehicle.eta}</p>
                  </div>
                </Popup>
              </Marker>
              
              {targetIncident && (
                <Polyline 
                  positions={[vehicle.location, targetIncident.location]} 
                  color="#3b82f6" 
                  weight={3}
                  dashArray="10, 10"
                />
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
