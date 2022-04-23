import React from "react";
import { FlatList, TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

import { APP_URL_EMU } from "../../utils/config";

const UserTextInput = (props) => {
    //Liste des suggestions pour ce que l'user a écrit dans l'input
    const [suggestions, setSuggestions] = useState(new Array);
    //L'adresse selectionnée par l'user
    const [selectedUser, setSelectedUser] = useState("");

    let abortController = new AbortController();

    console.log("user selected input : ", selectedUser);

    const onUserSelected = (newuser) => {
        console.log("vérif argument : ", newuser.pseudo);
        props.onUserChange && props.onUserChange(newuser);
        setSelectedUser(newuser.pseudo);
        setSuggestions(new Array);
    }

    const handleChangeText = (text) => {
        setSelectedUser(text);

        //Abandonne le/les fetch en cours pour en lancer un nouveau
        abortController.abort();
        abortController = new AbortController();
        if(text.length > 2) {
            try {
                fetch(APP_URL_EMU + '/api/users/search/'+text, {method: 'GET',signal:abortController.signal})
                    .then(response => response.json())
                    .then((result) => {
                        console.log(result);
                        setSuggestions([]);
                        result.map((item) => {
                            setSuggestions((suggestions) => {
                                return [...suggestions,item];
                            });
                        });
                    })
                    .catch((error) => {
                        console.log('error fetch des users', error);
                    })
            } catch (error) {
                console.log("erreur du try catch : ", error);

            }
        } else {
            setSuggestions([]);
        }
    }

    return(
        <View style={[props.style,{zIndex: 1}]}>
            <TextInput
                onChangeText={(text) => handleChangeText(text)}
                style={styles.inputStyle}
                placeholder={"Chercher un utilisateur"}
                defaultValue={selectedUser}
                maxLength={50}
                value={selectedUser}
                // onEndEditing={() => {setSuggestions(new Array)}}
            />

            {suggestions.length ?
            <View style={styles.suggestionsContainer}>
                    {suggestions.map((item,key)=> 
                    <TouchableOpacity
                        key={key}
                        onPress={() => {onUserSelected(item)}}
                    >
                        <Text style={styles.suggestionItem}>{item.pseudo}</Text>
                    </TouchableOpacity>)}
            </View> :
            <></>}
            
        </View>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: "white",
    }, 
    suggestionsContainer: {
        position: "relative",
        width: '100%'
    },
    suggestionsList: {
        position: "absolute",
        backgroundColor: 'white',
        padding: 5,
        width: "100%"
    },
    suggestionItem: {
        backgroundColor: 'white',
        padding: 5,
    }
});

export default UserTextInput;