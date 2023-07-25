import axios from "axios";

const API_URI = 'http://localhost:8000';

export const authenticate = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/authenticate`, data);
        return response.data;
    }
    catch (error) {
        console.log("Error in calling authenticate API", error.message);
    }
};

export const saveProfileInfo = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/signup`, data);
        return response.data;
    }
    catch (error) {
        console.log("Error in calling signup API", error.message);
    }
};

export const checkProfileInfo = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/login`, data);
        return response.data;
    }
    catch (error) {
        console.log("Error in calling login API", error.message);
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

export const fetchSolArray = async (data) => {
    try{
        const response = await axios.post(`${API_URI}/fetchdata`, data);
        return response.data;
    }
    catch(error){
        console.log("Error in calling fetch data API", error.message);
    }
};

export const fetchAllProblems = async () => {
    try{
        const response = await axios.post(`${API_URI}/fetchallproblems`);
        return response.data;
    }
    catch(error){
        console.log("Error in calling fetch problems API", error.message);
    }
};

export const fetchSpecificProblems = async (data) => {
    try{
        const response = await axios.post(`${API_URI}/fetchproblem`, data);
        return response.data;
    }
    catch(error){
        console.log("Error in calling fetch problem API", error.message);
    }
};

export const addSolution = async (data) => {
    try{
        const response = await axios.post(`${API_URI}/addsolution`, data);
        return response.data;
    }
    catch(error){
        console.log("Error in calling add solution API", error.message);
    }
};