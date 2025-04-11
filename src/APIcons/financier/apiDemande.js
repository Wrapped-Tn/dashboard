import axios from "axios"
import {PORT} from "../port"


export const getDemande = async (query)=> {
    try {
    const response= await axios.get(PORT+"/financeManager/demand/getAll?q="+query)
    console.log(response.data);
    if(response.status==200){
        console.log(response.data);
        
        return response.data
    }else{
        console.log(response.status);
        return null
    }
    }catch(e){
        console.log(e);  
    }
}

export const updateDemande = async (id, demandeData) => {
    try {
        const response = await axios.put(PORT + "/financeManager/demand/update:"+id ,{demandeData });
        if (response.status === 200) {
            return response.data;
        }
        console.error('Erreur lors de la mise à jour:', response.status);
        return null;
    }
    catch (e) {
        console.error('Erreur lors de la mise à jour:', e);
        throw e;
    }
}
export const deleteDemande = async (id) => {
    try {
        const response = await axios.delete(`${PORT}/financeManager/demand/delete/${id}`);
        if (response.status === 200) {
            return response;
        }
        console.error('Erreur lors de la suppression:', response.status);
        return null;
    } catch (e) {
        console.error('Erreur lors de la suppression:', e);
        throw e;
    }
}