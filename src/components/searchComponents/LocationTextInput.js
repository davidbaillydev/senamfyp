import React from "react";
import { FlatList, TextInput, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

import * as config from "../../utils/config";
import { WHITE } from "../../utils/commonStyles";

const LocationTextInput = (props) => {
    //Liste des suggestions pour ce que l'user a écrit dans l'input
    const [suggestions, setSuggestions] = useState(new Array);
    //L'adresse selectionnée par l'user
    const [selectedAddress, setSelectedAddress] = useState("");

    let abortController = new AbortController();

    console.log("adresse selected input : ", selectedAddress);

    const onAddressSelected = (newAddress) => {
        console.log("vérif argument : ", newAddress.properties.label);
        props.onAddressChange && props.onAddressChange(newAddress.properties.label);
        props.setAddressComponents && props.setAddressComponents(newAddress);
        setSelectedAddress(newAddress.properties.label);
        setSuggestions(new Array);
    }

    const handleChangeText = (text) => {
        setSelectedAddress(text);

        //Abandonne le/les fetch en cours pour en lancer un nouveau
        abortController.abort();
        abortController = new AbortController();
        if(text.length > 2) {
            try {
                fetch('https://api-adresse.data.gouv.fr/search/?q='+text, {method: 'GET', signal: abortController.signal})
                    .then(response => response.json())
                    .then((result) => {
                        console.log(result);
                        setSuggestions([]);
                        result.features.map((item) => {
                            setSuggestions((suggestions) => {
                                return [...suggestions,item];
                            });
                        });
                    })
                    .catch((error) => {
                        console.log('error fetch des villes', error);
                    })
            } catch (error) {
                console.log("erreur du try catch : ", error);

            }
        } else {
            setSuggestions([]);
        }
    }

    return(
        <View style={[{zIndex: 1}, , props.customStyle]}>
            <TextInput
                onChangeText={(text) => handleChangeText(text)}
                style={[styles.inputStyle]}
                placeholder={"Lieu de l'évènement"}
                defaultValue={selectedAddress}
                maxLength={50}
                value={selectedAddress}
                // onEndEditing={() => {setSuggestions(new Array)}}
            />
            {suggestions.length ?
            <View style={styles.suggestionsContainer}>
                {suggestions.map((item,key)=> 
                    <TouchableOpacity
                        key={key}
                        onPress={() => {onAddressSelected(item)}}
                    >
                        <Text style={styles.suggestionItem}>{item.properties.label}</Text>
                    </TouchableOpacity>)}
            </View> :
            <></>}
        </View>
    );
}

const styles = StyleSheet.create({
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

export default LocationTextInput;