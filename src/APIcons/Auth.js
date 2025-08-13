import axios from "axios";
import { PORT } from "./port";

export const SignIn = async (email, password) => {
  try {
    const response = await axios.post(`${PORT}/auth/signin`, {
      email,
      password,
    });
    console.log("response is here:",response.data.data);
    
    if (response.status === 200 && response.data.data.token) {
      // ✅ Stocker la réponse complète avec le token
      localStorage.setItem("userData", JSON.stringify(response.data.data));
      return response.data.data;
    } else {
      console.warn("Réponse de connexion sans token :", response.data.data);
      return null;
    }
  } catch (e) {
    console.error("Erreur lors du login :", e);
    return null;
  }
};

