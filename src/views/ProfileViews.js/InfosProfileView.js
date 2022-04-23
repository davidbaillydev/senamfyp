import { ActivityIndicator, Button, Image, SafeAreaView, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Disconnection from "../../components/authenticationComponents/Disconnection";
import { fetchUserInfos } from "../../utils/functions";
import * as commonStyles from "../../utils/commonStyles";
import { APP_URL_EMU } from "../../utils/config";

const InfosProfileView = (props) => {

    const [user,setUser] = useState({});
    const [isDataReceived,setIsDataReceived] = useState(false);

    const disconnect = () => {
        props.disconnect(false);
    }

    const navToEdit = () => {
        props.navigation.navigate("EditProfile");
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

    console.log(props);

    return(
        <SafeAreaView style={styles.container}>
            {isDataReceived ?
                <>
                <Disconnection disconnect={disconnect}/>
                <Text>Salut {user.pseudo} !</Text>
                <Image source={{ uri: APP_URL_EMU +"/"+ user.profil_picture }} style={styles.imgProfile} />
                <Button title="Modifier le profil" onPress={navToEdit}/>
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
        
