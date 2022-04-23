import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, SafeAreaView } from "react-native";
import Disconnection from "../../components/authenticationComponents/Disconnection";
import LoginForm from "../../components/authenticationComponents/LoginForm";
import RegisterForm from "../../components/authenticationComponents/RegisterForm";


const LogInOrSignInView = (props) => {

  
    const [register,setRegister] = useState(false);
    const [login,setLogin] = useState(false);
    const [connected,setConnected] = useState(false);
    const [userInfos,setUserInfos] = useState({});

    
 

    const returnToMenu = () => {
        setLogin(false);
        setRegister(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            {!register && !login && 
            <>
                <Button title = "Se connecter" onPress={setLogin}/>
                <Button title = "S'inscrire" onPress={setRegister}/>
            </>
            }
            {register && <RegisterForm menu={returnToMenu} connect={props.setToken} />}
            {login && <LoginForm menu={returnToMenu} connect={props.setToken} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
});

export default LogInOrSignInView;
