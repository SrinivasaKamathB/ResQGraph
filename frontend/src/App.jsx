import React from 'react';
import { DisasterProvider } from './context/DisasterContext';
import SidebarNav from './components/SidebarNav';
import Navbar from './components/Navbar';
import MapContainer from './components/MapContainer';
import DistressStream from './components/DistressStream';
import OptimalRouteDispatch from './components/OptimalRouteDispatch';
import BeforeAfterModal from './components/BeforeAfterModal';
import SitrepModal from './components/SitrepModal';
import TelemetryModal from './components/TelemetryModal';
import GisLayersModal from './components/GisLayersModal';
import RadioChannelsModal from './components/RadioChannelsModal';
import SettingsModal from './components/SettingsModal';
import HelpModal from './components/HelpModal';

export default function App() {
  return (
    <DisasterProvider>
      <div className="flex h-screen w-screen bg-[#0B0F17] overflow-hidden select-none">
        {/* Leftmost Icon Navigation Rail */}
        <SidebarNav />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Navbar */}
          <Navbar />

          {/* Core Command Center Grid */}
          <div className="flex-1 flex h-[calc(100vh-4rem)] overflow-hidden">
            {/* Center: Interactive Dark-Mode Urban Map */}
            <div className="flex-1 h-full relative isolate z-0 overflow-hidden">
              <MapContainer />
            </div>

            {/* Right Command Panel: Distress Feed & Route Dispatch */}
            <div className="w-[420px] flex-shrink-0 h-full flex flex-col border-l border-slate-800 bg-[#0E131F]">
              <DistressStream />
              <OptimalRouteDispatch />
            </div>
          </div>
        </div>

        {/* Interactive Overlays & Modals */}
        <BeforeAfterModal />
        <SitrepModal />
        <TelemetryModal />
        <GisLayersModal />
        <RadioChannelsModal />
        <SettingsModal />
        <HelpModal />
      </div>
    </DisasterProvider>
  );
}
