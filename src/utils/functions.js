import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_URL_EMU } from "./config";
import moment from "moment";
import 'moment/locale/fr';

export async function fetchUserInfos() {
    const id = await AsyncStorage.getItem("user_id");

    const url = APP_URL_EMU + "/api/users/" + id;

    //console.log("url de fetch user : ", url);

    return fetch(url, { method: 'GET'})
        .then((response) => response.json())
        .then((responseData) => {
            return(responseData);
        })
        .catch((error) => { console.log("fun error"); console.log(error) });
}

export const formatDate = (date) => {
    const split = date.split("/");
    return (split[1]+"/"+split[0]+"/"+split[2]);
}

export const formatTime = (time) => {
    const split = time.split(":");
    return(split[0]+":"+split[1]);
}

// Format :
// L : 25/03/2022
// LL : 25 Mars 2022
// LLL : 25 Mars 2022 à 19:00
export const formatDateFromDB = (date) => {
    let new_date = "";
    new_date = moment(date).format("L")
    return new_date;
}

export const formatTimeFromDB = (time) => {
    const split = time.split(":");
    return(split[0]+":"+split[1]);
}

export const formatDateFromPicker = (date) => {
    return moment(date).format("L");
}

export const formatTimeFromPicker = (time) => {
    return moment(time).format("HH:mm");
}

export const formatDateForDB = (date) => {
    return moment(date).format("YYYY-MM-DD");
}

export const formatTimeForDB = (time) => {
    return moment(time).format("HH:mm:ss");
}

//Exemple d'argument pour une date personnalisée : "2018-06-03 15:30:00"
export const formatDateTimeForPayment = (_date = null) => {
    let date = "";
    moment.locale("fr");
    if (_date != null) {
        date = moment(_date).format("YYYYMMDDHHmmss");
    } else {
        date = moment().format("YYYYMMDDHHmmss");
    }
    
    console.log("date : ", date);
    return date;
}

export const generateCode = (size = 8) => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Pick characers randomly
    let str = '';
    for (let i = 0; i < size; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;
}