import axios from "axios"
import {PORT} from "../port"

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

export const getUser = async ()=> {
    try {
    const response= await axios.get(PORT+"/admin/workers/", getAuthHeaders())
    console.log(response.data);
    if(response.status==200){
        return response.data
    }else{
        console.log(response.status);
        return null
    }
    }catch(e){
        console.log(e);  
    }
    }
export const addWorker = async (workerData) => {
    try {
      console.log("Données envoyées:", workerData);
      const response = await axios.post(PORT + "/workers/addWorker", workerData);
      if (response.status === 201) {
        return response.data;
      }
      console.error("Erreur lors de l'ajout:", response.status);
      return null;
    } catch (e) {
      console.error("Erreur lors de l'ajout:", e);
      throw e;
    }
  };
export const updateWorker = async (id, workerData) => {
    try {
      const response = await axios.put(`${PORT}/workers/updateWorker/${id}`, workerData);
      if (response.status === 200) {
        return response.data;
      }
      console.error('Erreur lors de la mise à jour:', response.status);
      return null;
    } catch (e) {
      console.error('Erreur lors de la mise à jour:', e);
      throw e;
    }
  };
export const deleteWorker = async (id) => {
    try {
      const response = await axios.delete(`${PORT}/workers/delWorker/${id}`);
      if (response.status === 200) {
        return response;
      }
      console.error('Erreur lors de la suppression:', response.status);
      return null;
    } catch (e) {
      console.error('Erreur lors de la suppression:', e);
      throw e;
    }
  };