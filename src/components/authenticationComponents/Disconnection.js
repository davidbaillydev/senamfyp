import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import React from "react";

const Disconnection = (props) => {
    
    const logout = async () => {
        try {     
            await AsyncStorage.setItem('api_token','');
            // await AsyncStorage.clear();
            props.disconnect();
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Button title="Déconnexion" onPress={logout}/>
    )

}

export default Disconnection