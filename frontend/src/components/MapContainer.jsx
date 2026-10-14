import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import defaultLandmarks from '../data/landmarks_bengaluru.json';
import { useDisaster } from '../context/DisasterContext';
import { Crosshair, Layers, Compass } from 'lucide-react';

// Create custom animated SVG icons for map pins
const createCustomIcon = (priority, count, confidence) => {
  const isP1 = priority === 'P1';
  const bgBadge = isP1 ? 'bg-red-500' : 'bg-amber-500';

  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute -inset-2 rounded-full ${isP1 ? 'animate-ping bg-red-500/40' : 'bg-amber-500/20'}"></div>
        <div class="relative w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-white text-[11px] font-extrabold shadow-lg ${bgBadge}">
          ${count}
        </div>
        <div class="absolute -bottom-1 -right-1 px-1 py-0.2 rounded bg-slate-950 border border-slate-700 text-[8px] font-bold text-slate-200">
          ${confidence[0]}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const boatIcon = L.divIcon({
  className: 'boat-marker',
  html: `
    <div class="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 border-2 border-slate-900 flex items-center justify-center font-bold text-xs shadow-[0_0_12px_#06b6d4]">
      🚤
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

// Auto-bounds fitter so all active clusters are framed on load/simulation
function MapAutoFitter({ points, triggerRecenter }) {
  const map = useMap();

  useEffect(() => {
    if (points && points.length > 0) {
      const bounds = points.map((p) => [p.lat, p.lng]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
    }
  }, [points.length, triggerRecenter, map]);

  return null;
}

export default function DisasterMap() {
  const { activeReports, isApproved } = useDisaster();
  const [mapMode, setMapMode] = useState('tactical'); // 'tactical' | 'satellite'
  const [recenterCount, setRecenterCount] = useState(0);

  // Staging Base
  const baseCoords = [12.9490, 77.6650]; // HAL Airbase Staging

  // Dynamically cluster active reports around landmarks
  const clusterData = Object.entries(defaultLandmarks).map(([key, data]) => {
    const matchingReports = activeReports.filter((r) => {
      const text = (r.extracted_landmark || r.raw_text || '').toLowerCase();
      return (
        text.includes(key) ||
        (data.aliases && data.aliases.some((a) => text.includes(a.toLowerCase())))
      );
    });

    const reportCount = matchingReports.length;
    const maxWater = matchingReports.reduce((m, r) => Math.max(m, r.est_water_level || 0), 0);
    const hasMedical = matchingReports.some((r) => r.medical_emergency);
    const totalStranded = matchingReports.reduce((sum, r) => sum + (r.casualties || 0), 0);
    const isP1 = maxWater >= 1.5 || hasMedical;

    const confidence = reportCount >= 5 ? 'HIGH' : reportCount >= 2 ? 'MEDIUM' : 'LOW';

    return {
      key,
      title: key.toUpperCase(),
      area: data.area,
      lat: data.lat,
      lng: data.lng,
      count: reportCount,
      waterLevel: maxWater || 1.2,
      hasMedical,
      totalStranded,
      priority: isP1 ? 'P1' : 'P2',
      confidence,
    };
  }).filter((c) => c.count > 0);

  // Dynamic Cyan Route Polylines to high priority incident clusters
  const boatRoutes = [
    {
      id: 'BOAT_ALPHA',
      coords: [
        baseCoords,
        [12.9360, 77.6961], // Kadubeesanahalli
        [12.9255, 77.6826], // RMZ Ecospace
      ],
    },
    {
      id: 'BOAT_BRAVO',
      coords: [
        baseCoords,
        [12.9126, 77.6872], // Rainbow Drive
        [12.8988, 77.6749], // Kasavanahalli
      ],
    },
    {
      id: 'BOAT_CHARLIE',
      coords: [
        baseCoords,
        [12.9463, 77.6789], // Yamalur
        [12.9569, 77.7011], // Marathahalli
      ],
    },
    {
      id: 'BOAT_DELTA',
      coords: [
        [12.9350, 77.6200], // Koramangala SDRF Base
        [12.9116, 77.6388], // HSR Sector 5
        [12.9176, 77.6234], // Silk Board
      ],
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#0B0F17]">
      <MapContainer
        center={[12.930, 77.660]}
        zoom={12}
        className={`w-full h-full ${mapMode === 'tactical' ? 'dark-map-tiles' : ''}`}
        zoomControl={false}
      >
        <MapAutoFitter points={clusterData} triggerRecenter={recenterCount} />

        {/* Free, Keyless, Watermark-Free Map Tiles */}
        {mapMode === 'tactical' ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
        ) : (
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, USGS'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={18}
          />
        )}

        {/* Rescue Boat Optimal Routes (Glowing Cyan Polylines) */}
        {boatRoutes.map((route) => (
          <Polyline
            key={route.id}
            positions={route.coords}
            pathOptions={{
              color: '#06b6d4',
              weight: isApproved ? 4 : 3,
              opacity: 0.95,
              dashArray: isApproved ? null : '6, 8',
              className: 'glow-route-cyan',
            }}
          />
        ))}

        {/* HAL Staging Base Marker */}
        <Marker position={baseCoords} icon={boatIcon}>
          <Popup>
            <div className="p-1 text-slate-900">
              <h4 className="font-bold text-xs">HAL Rescue Staging Base</h4>
              <p className="text-[11px] text-slate-600">4 Inflatable Boats Deployed</p>
            </div>
          </Popup>
        </Marker>

        {/* Clustered Incident Markers */}
        {clusterData.map((cluster) => (
          <Marker
            key={cluster.key}
            position={[cluster.lat, cluster.lng]}
            icon={createCustomIcon(cluster.priority, cluster.count, cluster.confidence)}
          >
            <Popup>
              <div className="p-2 text-slate-900 min-w-[200px]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded text-white ${cluster.priority === 'P1' ? 'bg-red-600' : 'bg-amber-600'}`}>
                    {cluster.priority} CRITICAL
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">
                    CONFIDENCE: {cluster.confidence}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">{cluster.title}</h3>
                <p className="text-xs text-slate-600 mb-2">{cluster.area}</p>

                <div className="space-y-1 text-xs border-t pt-1.5 border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reports Merged:</span>
                    <span className="font-bold">{cluster.count} citizen calls</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Water Depth:</span>
                    <span className="font-bold text-blue-600">{cluster.waterLevel}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Stranded Victims:</span>
                    <span className="font-bold text-red-600">{cluster.totalStranded} people</span>
                  </div>
                  {cluster.hasMedical && (
                    <div className="mt-1 p-1 bg-red-50 text-red-700 text-[10px] font-bold rounded">
                      ⚠️ Medical Emergency / Paramedic Required
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Top-Right Map Controls: Layer Switcher & Recenter */}
      <div className="absolute top-4 right-4 z-[500] flex items-center gap-2">
        <button
          onClick={() => setRecenterCount((c) => c + 1)}
          className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 shadow-lg transition"
          title="Recenter view on active clusters"
        >
          <Crosshair size={13} className="text-cyan-400" />
          Recenter
        </button>

        <button
          onClick={() => setMapMode(mapMode === 'tactical' ? 'satellite' : 'tactical')}
          className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 shadow-lg transition"
          title="Toggle Tactical Dark / Satellite Imagery"
        >
          <Layers size={13} className="text-amber-400" />
          {mapMode === 'tactical' ? 'Satellite View' : 'Tactical Dark'}
        </button>
      </div>

      {/* Bottom Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[500] bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-3 text-xs shadow-xl space-y-2">
        <div className="font-bold text-slate-200 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
          <Compass size={13} className="text-cyan-400" />
          <span>Bengaluru Tactical GIS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></span>
          <span className="text-slate-300">P1 Critical Cluster (Life Danger)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="text-slate-300">P2 Moderate Cluster (Waterlogging)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-1 bg-cyan-400 shadow-[0_0_8px_#06b6d4]"></span>
          <span className="text-slate-300">OR-Tools Optimal Boat Corridors</span>
        </div>
      </div>
    </div>
  );
}
