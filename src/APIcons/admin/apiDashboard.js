import axios from "axios"
import {PORT} from "../port"

///////////////////Statistiques///////////////////////
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
///////////////////Statistiques///////////////////////

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