import axios from "axios";

const API_URI = 'http://localhost:8000';

export const saveProfileInfo = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/signup`, data);
        return response.data;
    }
    catch (error) {
        console.log("Error in calling singup API", error.message);
    }
};

export const compileTheCode = async (data) => {
    try{
        const response = await axios.post(`${API_URI}/run`, data);
        return response.data;
    }
    catch(error){
        console.log("Error in calling run API", error.message);
        return {success: true, output: "Error!"};
    }
};