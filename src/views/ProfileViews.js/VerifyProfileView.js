import { ActivityIndicator, Button, Image, SafeAreaView, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Disconnection from "../../components/authenticationComponents/Disconnection";
import { fetchUserInfos } from "../../utils/functions";
import * as commonStyles from "../../utils/commonStyles";
import { APP_URL_EMU } from "../../utils/config";

const InfosProfileView = ({ navigation }) => {

    const [user,setUser] = useState({});
    const [isDataReceived,setIsDataReceived] = useState(false);


    const navToEdit = () => {
        navigation.navigate("EditProfile");
    }

    useEffect(()=>{
        console.log("fetch");
        fetchUserInfos()
            .then(result => {
                setUser(result);
            })
            .catch(error=>{
                console.log("error useEffect");
                console.log(error);
            })
    },[]);

    // Appelé lorsque le state "user" change
    useEffect(() => {
        setIsDataReceived(true);
    }, [user]);

    return(
        <SafeAreaView style={styles.container}>
            {isDataReceived ?
                <>
                <Button title="Retour" onPress={navToEdit}/>
                </>
           :  <ActivityIndicator size='large' color={commonStyles.LIGHT_ORANGE} />
            }
        </SafeAreaView>
    );
} 

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    imgProfile: {
        height: 80,
        width: 80
    },
});

export default InfosProfileView;
        
