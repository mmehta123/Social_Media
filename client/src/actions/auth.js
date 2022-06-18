import * as api from "../api";
import { AUTH } from "../constants/actionTypes.js";


export const signIn = (formData, router) => async (dispatch) => {
    try {
        const {data}=await api.signIn(formData);
        if(data.status){
            dispatch({type:AUTH,data});
            router.push("/");
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
    } catch (error) {
        console.log(error)
    }
}