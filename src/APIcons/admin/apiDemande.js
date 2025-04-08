import axios from "axios"
import {PORT} from "../port"


export const getDemande = async (query)=> {
    try {
    const response= await axios.get(PORT+"/admin/demand/getAll?q="+query)
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