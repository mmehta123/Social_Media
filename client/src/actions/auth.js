import * as api from "../api";
import { AUTH } from "../constants/actionTypes.js";


export const signIn = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        if (data.status) {
            dispatch({ type: AUTH, data });
            router.push("/");
        }else{
            alert(data.message)
        }

    } catch (error) {
        console.log(error)
    }
}

export const signUp = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        if (data.status) {
            dispatch({ type: AUTH, data });
            router.push("/");
        }
        else {
            alert(data.message);
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateUserData = (userId, info) => async (dispatch) => {
    try {
        const {data}=await api.updateUserData(userId, info);
        localStorage.setItem('profile', JSON.stringify(data));
        
    } catch (error) { console.log(error) }
}