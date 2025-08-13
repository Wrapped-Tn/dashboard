import axios from "axios";
import { PORT } from "../port";

// Fonction utilitaire pour récupérer le token depuis localStorage
const getAuthHeaders = () => {
  try {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData?.token) {
      return {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      };
    }
    console.warn("Token non trouvé dans localStorage.");
    return {};
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
    return {};
  }
};

/////////////////// Statistiques ///////////////////////
export const statLine = async (period = 'day') => {
  try {
    const response = await axios.get(`${PORT}/adminDash/stats1`, {
      params: { period },
      ...getAuthHeaders()
    });
    if (response.status === 200) {
      return response.data;
    }
    console.error(`Unexpected status code: ${response.status}`);
    return null;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
};

export const statRadar = async () => {
  try {
    const response = await axios.get(`${PORT}/adminDash/stats2`, getAuthHeaders());
    if (response.status === 200) {
      return response.data;
    }
    console.log(response.status);
    return null;
  } catch (e) {
    console.log(e);
  }
};

export const statBare = async () => {
  try {
    const response = await axios.get(`${PORT}/adminDash/stats3`, getAuthHeaders());
    if (response.status === 200) {
      return response.data;
    }
    console.log(response.status);
    return null;
  } catch (e) {
    console.log(e);
  }
};

/////////////////// Comptes ///////////////////////
export const getTotalUser = async () => {
  try {
    const response = await axios.get(`${PORT}/admin/summary/users`, getAuthHeaders());
    if (response.status === 200) {
      return response.data;
    }
    console.log('response totalUser Data:',response.status);
    return null;
  } catch (e) {
    console.log(e);
  }
};

export const getTotalBrand = async () => {
  try {
    const response = await axios.get(`${PORT}/admin/summary/brands`, getAuthHeaders());
    if (response.status === 200) {
      return response.data;
    }
    console.log(response.status);
    return null;
  } catch (e) {
    console.log(e);
  }
};

export const getTotalSels = async () => {
  try {
    const response = await axios.get(`${PORT}/adminDash/total-sales`, getAuthHeaders());
    if (response.status === 200) {
      return response.data;
    }
    console.log(response.status);
    return null;
  } catch (e) {
    console.log(e);
  }
};

export const getTotalTransaction = async (query) => {
  try {
    const response = await axios.get(`${PORT}/adminDash/stats4?role=${query}`, getAuthHeaders());
    if (response.status === 200) {
      return response.data;
    }
    console.warn('Unexpected response status:', response.status);
    return null;
  } catch (e) {
    console.error('Erreur dans getTotalTransaction:', e);
    return null;
  }
};
