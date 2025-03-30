import axios from "axios"
import {PORT} from "../port"

export const getTotalUser = async ()=> {
try {
const response= await axios.get(PORT+"/adminDash/total-users")
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
export const getTotalBrand = async ()=> {
    try {
    const response= await axios.get(PORT+"/adminDash/total-brands")
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
    export const getTotalSels = async ()=> {
        try {
        const response= await axios.get(PORT+"/adminDash/total-sales")
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

        export const statLine = async (period = 'day') => {
          try {
            const response = await axios.get(`${PORT}/adminDash/stats1`, {
              params: { period } // Ajout du paramètre period
            });
            console.log(response.data);
            if (response.status === 200) {
              return response.data;
            }
            
            console.error(`Unexpected status code: ${response.status}`);
            return null;
          } catch (error) {
            console.error('Error fetching stats:', error);
            
            // Vous pourriez vouloir différencier les erreurs de réponse du serveur
            if (error.response) {
              // La requête a été faite et le serveur a répondu avec un code de statut hors 2xx
              console.error('Server responded with:', error.response.data);
              console.error('Status code:', error.response.status);
            } else if (error.request) {
              // La requête a été faite mais aucune réponse n'a été reçue
              console.error('No response received:', error.request);
            } else {
              // Une erreur s'est produite lors de la configuration de la requête
              console.error('Request setup error:', error.message);
            }
            
            return null;
          }
        };
        export const statRadar = async ()=> {
            try {
            const response= await axios.get(PORT+"/adminDash/stats2")
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
            export const statBare = async ()=> {
                try {
                const response= await axios.get(PORT+"/adminDash/stats3")
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
                export const getUser = async ()=> {
                    try {
                    const response= await axios.get(PORT+"/workers/getAllWorkers")
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
                          if (response.status >= 200 && response.status < 300) {
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
                            return response.data;
                          }
                          console.error('Erreur lors de la suppression:', response.status);
                          return null;
                        } catch (e) {
                          console.error('Erreur lors de la suppression:', e);
                          throw e;
                        }
                      };

                      export const GetTransaction = async (id) => {
                        try {
                          const response = await axios.get(`${PORT}/api/transactions`);
                          if (response.status === 200) {
                            return response.data;
                          }
                          console.error('Erreur :', response.status);
                          return null;
                        } catch (e) {
                          console.error('Erreur :', e);
                          throw e;
                        }
                      };
                      export const getDemande = async (id) => {
                        try {
                          const response = await axios.get(`${PORT}/api/demand/`);
                          if (response.status === 200) {
                            return response.data;
                          }
                          console.error('Erreur :', response.status);
                          return null;
                        } catch (e) {
                          console.error('Erreur :', e);
                          throw e;
                        }
                      };