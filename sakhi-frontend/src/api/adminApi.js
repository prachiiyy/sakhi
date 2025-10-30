// src/api/adminApi.js
import api from "../axiosConfig";

// NGOs
export const getPendingNgos = () => api.get("/api/auth/pending-ngos");
export const getAllNgos = () => api.get("/api/auth/all-ngos");
export const approveNgo = (id) => api.post(`/api/auth/approve/${id}`);

// Help
export const getAllHelpRequests = () => api.get("/api/help/all");

// Accommodation
export const getAllAccommodationRequests = () => api.get("/api/accommodation/all");

// Donations
export const getAllDonations = () => api.get("/api/donation/all");

export default {
  getPendingNgos,
  getAllNgos,
  approveNgo,
  getAllHelpRequests,
  getAllAccommodationRequests,
  getAllDonations,
};
