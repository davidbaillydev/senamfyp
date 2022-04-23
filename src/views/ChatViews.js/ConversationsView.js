import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import { APP_URL_EMU } from "../../utils/config";
import { fetchUserInfos } from "../../utils/functions";
import { LIGHT_ORANGE } from "../../utils/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const ConversationView = (props) => {
    const [user, setUser] = useState({});
    const [interlocutors, setInterlocutors] = useState([]);

    useEffect(()=>{
        fetchUserInfos()
            .then(result => {
                setUser(result);
            })
    }, []);

    useEffect(() => {
        fetch(APP_URL_EMU + "/api/chats/" + user.id, { method: 'GET' })
            .then((response) => response.json())
            .then(responseData => {
                // console.log(responseData);
                // console.log("contenu -------------------------------");
                // Object.entries(responseData).forEach(([key, value]) => {
                //     console.log(value);
                // })
                // console.log("---------------------------------------");
                setInterlocutors(responseData);
            })
            .catch(error => console.log(error))
    }, [user]);

    const handleOpenConversation = (id) => {
        props.navigation.navigate("Messages", {
            interlocutor_id: id,
        });
    }

    return(
        <SafeAreaView>
            {Object.entries(interlocutors).length !== 0 ?
            <FlatList
                data={interlocutors}
                renderItem={({item}) => {
                    //console.log(item);
                    return(<Button title={item.pseudo} onPress={() => {handleOpenConversation(item.id)}} />);
                }}
                keyExtractor={item => item.id}
            />
            :
            Object.entries(interlocutors).length === 0 ?
            <Text>Aucune conversation</Text>
            :
            <ActivityIndicator size='large' color={LIGHT_ORANGE}/>}
        </SafeAreaView>
    );
}

export default ConversationView;