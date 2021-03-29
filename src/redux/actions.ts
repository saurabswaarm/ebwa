import { SET_USER_ERR, SET_USER, REMOVE_USER} from './actionTypes';
import {UserCredentials, IUserF, AuthError, AuthResponse} from '../../types/authTypes';
import {Store, Action} from 'redux';
import {config} from '../config';



export const logInUser = function(credentialsObject:UserCredentials){
    return async function(dispatch:Store['dispatch'], getState:Store['getState']){
        try{
        let response: Response = await fetch(
            `${config.host}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials:"include",
              body: JSON.stringify(credentialsObject),
            }
        );

        let responseJson = await response.json();

        if(responseJson.code == 2){
            dispatch(setUser(responseJson.payload.user))
        } else {
            dispatch(setNoUser(responseJson.payload))
        }
        } catch(err){
            console.log(err);
           dispatch(removeUser()) 
        }
    }
}

export const logOutUser = function(){
    return async function(dispatch:Store['dispatch'], getState:Store['getState']){
        console.log('Logout action fired');
        let response: Response = await fetch(
            '${config.host}/api/auth/logout',
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials:'include'
            }
        )

        let responseJson = await response.json();
        
        if(responseJson.code == 3){
            dispatch(removeUser())
        } else {
            dispatch(setNoUser(responseJson.payload))
        }


    }
}

export const setUser = function(userObject:IUserF) {
    return {
        type:SET_USER,
        payload:userObject
    } 
}

export const setNoUser:(arg0:AuthError)=>Action = function(authError:AuthError){
    return {
        type:SET_USER_ERR,
        payload:{
            code:authError.code,
            status:authError.payload.status,
            message:authError.payload.message
        }
    }
}

export const removeUser = function() {
    return {
        type:REMOVE_USER,
        payload:null
    }
}



