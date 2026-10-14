import React, { createContext, useContext, useState, useEffect } from 'react';

const DisasterContext = createContext();

import defaultReports from '../data/bengaluru_flood_50.json';
import defaultLandmarks from '../data/landmarks_bengaluru.json';

export const DisasterProvider = ({ children }) => {
  const [allReports] = useState(defaultReports);
  const [streamIndex, setStreamIndex] = useState(12); // Start with 12 initial reports
  const [isSimulating, setIsSimulating] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [showSitrep, setShowSitrep] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState(null);

  // Active navigation tab on the left sidebar
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'telemetry' | 'layers' | 'radio' | 'settings'

  // GIS layers visibility
  const [gisLayers, setGisLayers] = useState({
    floodInundation: true,
    shelters: true,
    criticalInfra: true,
    routes: true,
  });

  // Simulation settings
  const [meshOfflineMode, setMeshOfflineMode] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(500);

  // Active reports based on streamIndex
  const activeReports = allReports.slice(0, streamIndex);

  // Auto-simulation interval
  useEffect(() => {
    let timer;
    if (isSimulating && streamIndex < allReports.length) {
      timer = setInterval(() => {
        setStreamIndex((prev) => {
          if (prev >= allReports.length) {
            setIsSimulating(false);
            return prev;
          }
          return prev + 1;
        });
      }, simulationSpeed);
    }
    return () => clearInterval(timer);
  }, [isSimulating, streamIndex, allReports.length, simulationSpeed]);

  const startSimulation = () => {
    setStreamIndex(1);
    setIsSimulating(true);
    setIsApproved(false);
  };

  const resetSimulation = () => {
    setStreamIndex(12);
    setIsSimulating(false);
    setIsApproved(false);
  };

  const approvePlan = () => {
    setIsApproved(true);
  };

  const toggleGisLayer = (layerKey) => {
    setGisLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  return (
    <DisasterContext.Provider
      value={{
        allReports,
        activeReports,
        streamIndex,
        isSimulating,
        isApproved,
        showBeforeAfter,
        setShowBeforeAfter,
        showSitrep,
        setShowSitrep,
        showHelp,
        setShowHelp,
        selectedCluster,
        setSelectedCluster,
        activeTab,
        setActiveTab,
        gisLayers,
        toggleGisLayer,
        meshOfflineMode,
        setMeshOfflineMode,
        simulationSpeed,
        setSimulationSpeed,
        startSimulation,
        resetSimulation,
        approvePlan,
      }}
    >
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => useContext(DisasterContext);
