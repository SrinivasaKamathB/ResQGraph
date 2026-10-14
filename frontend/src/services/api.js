import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Mocking API for hackathon frontend demonstration if backend is not available
// Real implementations would use api.get / api.post

export const submitReport = (data) => api.post('/reports', data);
export const getReports = () => api.get('/reports');
export const processIncidents = () => api.post('/incidents/process');
export const getIncidents = () => api.get('/incidents');
export const approveIncident = (id) => api.post(`/incidents/${id}/approve`);
export const rejectIncident = (id) => api.post(`/incidents/${id}/reject`);
export const getDispatchPlan = () => api.get('/dispatch/plan');
export const getBaseline = () => api.get('/dispatch/baseline');
export const optimizeDispatch = () => api.post('/dispatch/optimize');
export const approveDispatch = () => api.post('/dispatch/approve');
export const startSimulation = () => api.post('/simulation/start');
export const resetSimulation = () => api.post('/simulation/reset');
export const getSimulationStatus = () => api.get('/simulation/status');
export const getVOIRecommendation = () => api.get('/voi/recommendation');
export const getSituationReport = () => api.get('/situation-report');

export default api;
