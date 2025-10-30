// src/api/ngoApi.js
import api from "../axiosConfig";

// Pending lists (NGO view)
export const getPendingHelpRequests = () => api.get("/api/help/pending");
export const getPendingAccommodationRequests = () => api.get("/api/accommodation/pending");

// Take / assign (NGO action)
export const takeHelpRequest = (id) => api.post(`/api/help/${id}/take`);
export const takeAccommodationRequest = (id) => api.post(`/api/accommodation/${id}/take`);

// Optionally fetch all assigned/own requests for NGO
export const getAllHelpRequestsForNGO = () => api.get("/api/help/all"); // backend should return NGO-specific if required
export const getAllAccommodationRequestsForNGO = () => api.get("/api/accommodation/all");

export default {
  getPendingHelpRequests,
  getPendingAccommodationRequests,
  takeHelpRequest,
  takeAccommodationRequest,
  getAllHelpRequestsForNGO,
  getAllAccommodationRequestsForNGO,
};
